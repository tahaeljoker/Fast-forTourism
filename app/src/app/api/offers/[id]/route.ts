import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'offers.json');

type Offer = {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  tourId: string;
};

// Helper function to read data
async function readOffersData(): Promise<Offer[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData) as Offer[];
  } catch (error) {
    // if (error.code === 'ENOENT') {
    //   return [];
    // }
    throw error;
  }
}

// Helper function to write data
async function writeOffersData(data: Offer[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET a single offer by ID
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const offers = await readOffersData();
    const offer = offers.find((o) => o.id === id);

    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading data', error: (error as Error).message }, { status: 500 });
  }
}

// DELETE an offer by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const offers = await readOffersData();
    const offerIndex = offers.findIndex((o) => o.id === id);

    if (offerIndex === -1) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    offers.splice(offerIndex, 1);
    await writeOffersData(offers);

    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data', error: (error as Error).message }, { status: 500 });
  }
}

// PUT (update) an offer by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const offers = await readOffersData();
    const offerIndex = offers.findIndex((o) => o.id === id);

    if (offerIndex === -1) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    const updatedOfferData = await request.json() as Partial<Offer>;
    
    // Basic validation
    if (!updatedOfferData.title || !updatedOfferData.discountPercentage) {
      return NextResponse.json({ message: 'Missing required fields: title and discountPercentage' }, { status: 400 });
    }

    offers[offerIndex] = { ...offers[offerIndex], ...updatedOfferData };
    await writeOffersData(offers);

    return NextResponse.json(offers[offerIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data', error: (error as Error).message }, { status: 500 });
  }
}