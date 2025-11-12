import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'tours.json');

type Tour = {
  id: string;
  name: string;
  country?: string;
  description?: string;
  price: number;
  image?: string;
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

// GET a single tour by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tours = await readToursData();
    const tour = tours.find((t) => t.id === id);

    if (!tour) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json(tour);
  } catch {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// DELETE a tour by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tours = await readToursData();
    const tourIndex = tours.findIndex((t) => t.id === id);

    if (tourIndex === -1) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 });
    }

    tours.splice(tourIndex, 1);
    await writeToursData(tours);

    return NextResponse.json({ message: 'Tour deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

// PUT (update) a tour by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tours = await readToursData();
    const tourIndex = tours.findIndex((t) => t.id === id);

    if (tourIndex === -1) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 });
    }

    const updatedTourData = await request.json();
    
    // Basic validation
    if (!updatedTourData.name || !updatedTourData.price) {
      return NextResponse.json({ message: 'Missing required fields: name and price' }, { status: 400 });
    }

    tours[tourIndex] = { ...tours[tourIndex], ...updatedTourData };
    await writeToursData(tours);

    return NextResponse.json(tours[tourIndex]);
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
