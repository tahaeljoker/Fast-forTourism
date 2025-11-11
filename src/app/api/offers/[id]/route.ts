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

// GET a single offer by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const offers = await readOffersData();
    const offer = offers.find((o) => o.id === params.id);

    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// DELETE an offer by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    let offers = await readOffersData();
    const offerIndex = offers.findIndex((o) => o.id === params.id);

    if (offerIndex === -1) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    offers.splice(offerIndex, 1);
    await writeOffersData(offers);

    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

// PUT (update) an offer by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    let offers = await readOffersData();
    const offerIndex = offers.findIndex((o) => o.id === params.id);

    if (offerIndex === -1) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    const updatedOfferData = await request.json();
    
    // Basic validation
    if (!updatedOfferData.title || !updatedOfferData.discountPercentage) {
      return NextResponse.json({ message: 'Missing required fields: title and discountPercentage' }, { status: 400 });
    }

    offers[offerIndex] = { ...offers[offerIndex], ...updatedOfferData };
    await writeOffersData(offers);

    return NextResponse.json(offers[offerIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
