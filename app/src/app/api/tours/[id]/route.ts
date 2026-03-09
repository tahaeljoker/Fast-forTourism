import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Tour = {
  id: string;
  name: string;
  country?: string;
  description?: string;
  price: number;
  image?: string;
};

// GET a single tour by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const { data: tour, error } = await supabase.from('tours').select('*').eq('id', id).single();

    if (error || !tour) {
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
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const { error } = await supabase.from('tours').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tour deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

// PUT (update) a tour by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const updatedTourData = await request.json();
    
    // Basic validation
    if (!updatedTourData.name || !updatedTourData.price) {
      return NextResponse.json({ message: 'Missing required fields: name and price' }, { status: 400 });
    }

    const { data, error } = await supabase.from('tours').update(updatedTourData).eq('id', id).select().single();

    if (error || !data) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
