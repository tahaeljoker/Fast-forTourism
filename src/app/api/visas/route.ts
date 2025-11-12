import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'src', 'data', 'visas.json');

// Helper function to read data
async function readVisasData() {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write data
async function writeVisasData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const visas = await readVisasData();
    return NextResponse.json(visas);
  } catch {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const visas = await readVisasData();
    const newVisa = await request.json();

    // Basic validation
    if (!newVisa.country || !newVisa.type || !newVisa.price) {
      return NextResponse.json({ message: 'Missing required fields: country, type, and price' }, { status: 400 });
    }

    const newVisaWithId = {
      id: (visas.length + 1).toString(),
      ...newVisa,
    };

    visas.push(newVisaWithId);
    await writeVisasData(visas);

    return NextResponse.json(newVisaWithId, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
