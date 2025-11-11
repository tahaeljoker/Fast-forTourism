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

// GET a single visa by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const visas = await readVisasData();
    const visa = visas.find((v) => v.id === params.id);

    if (!visa) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json(visa);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// DELETE a visa by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    let visas = await readVisasData();
    const visaIndex = visas.findIndex((v) => v.id === params.id);

    if (visaIndex === -1) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    visas.splice(visaIndex, 1);
    await writeVisasData(visas);

    return NextResponse.json({ message: 'Visa deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

// PUT (update) a visa by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    let visas = await readVisasData();
    const visaIndex = visas.findIndex((v) => v.id === params.id);

    if (visaIndex === -1) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    const updatedVisaData = await request.json();
    
    // Basic validation
    if (!updatedVisaData.country || !updatedVisaData.type || !updatedVisaData.price) {
      return NextResponse.json({ message: 'Missing required fields: country, type, and price' }, { status: 400 });
    }

    visas[visaIndex] = { ...visas[visaIndex], ...updatedVisaData };
    await writeVisasData(visas);

    return NextResponse.json(visas[visaIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
