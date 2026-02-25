import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'tours.json');

type Tour = {
  id: string;
  name: string;
  country: string;
  description?: string;
  price: number;
  image: string;
};

// Helper function to read data
async function readToursData(): Promise<Tour[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData) as Tour[];
  } catch (error: unknown) {
    const e = error as { code?: string };
    if (e.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write data
async function writeToursData(data: Tour[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const tours = await readToursData();
    return NextResponse.json(tours);
  } catch (error) {
    console.error('API/tours GET error:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: `Error reading data: ${message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const tours = await readToursData();
    const newTour = await request.json();

    // Basic validation
    if (!newTour.name || !newTour.price || !newTour.country || !newTour.image) {
      return NextResponse.json({ message: 'Missing required fields: name, price, country, and image' }, { status: 400 });
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
