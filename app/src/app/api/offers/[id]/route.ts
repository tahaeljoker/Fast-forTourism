import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Offer = {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  tourId: string;
};

// GET a single offer by ID
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const { data: offer, error } = await supabase
      .from('offers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !offer) {
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
    
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Error deleting offer', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data', error: (error as Error).message }, { status: 500 });
  }
}

// PUT (update) an offer by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updatedOfferData = await request.json() as Partial<Offer>;
    
    // Basic validation
    if (!updatedOfferData.title || !updatedOfferData.discountPercentage) {
      return NextResponse.json({ message: 'Missing required fields: title and discountPercentage' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('offers')
      .update({
        title: updatedOfferData.title,
        description: updatedOfferData.description,
        discountPerc: updatedOfferData.discountPercentage,
        tourId: updatedOfferData.tourId,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: 'Error updating offer', error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error writing data', error: (error as Error).message }, { status: 500 });
  }
}