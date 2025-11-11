import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'src', 'data', 'offers.json');

// Helper function to read data
async function readOffersData() {
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
async function writeOffersData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const offers = await readOffersData();
    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const offers = await readOffersData();
    const newOffer = await request.json();

    // Basic validation
    if (!newOffer.title || !newOffer.discountPercentage) {
      return NextResponse.json({ message: 'Missing required fields: title and discountPercentage' }, { status: 400 });
    }

    const newOfferWithId = {
      id: (offers.length + 1).toString(),
      ...newOffer,
    };

    offers.push(newOfferWithId);
    await writeOffersData(offers);

    return NextResponse.json(newOfferWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
