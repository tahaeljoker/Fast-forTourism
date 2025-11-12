import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'src', 'data', 'tours.json');

// Helper function to read data
async function readToursData() {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write data
async function writeToursData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const tours = await readToursData();
    return NextResponse.json(tours);
  } catch {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const tours = await readToursData();
    const newTour = await request.json();

    // Basic validation
    if (!newTour.name || !newTour.price) {
      return NextResponse.json({ message: 'Missing required fields: name and price' }, { status: 400 });
    }

    const newTourWithId = {
      id: (tours.length + 1).toString(),
      ...newTour,
    };

    tours.push(newTourWithId);
    await writeToursData(tours);

    return NextResponse.json(newTourWithId, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
