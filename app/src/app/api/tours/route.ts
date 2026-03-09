import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Tour = {
  id: string;
  name: string;
  country: string;
  description?: string;
  price: number;
  image: string;
};

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { data: tours, error } = await supabase.from('tours').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: `Error fetching tours: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json(tours || []);
  } catch (error) {
    console.error('API/tours GET error:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: `Error reading data: ${message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const newTour = await request.json();

    // Basic validation
    if (!newTour.name || !newTour.price || !newTour.country || !newTour.image) {
      return NextResponse.json({ message: 'Missing required fields: name, price, country, and image' }, { status: 400 });
    }

    const { data, error } = await supabase.from('tours').insert([newTour]).select().single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ message: `Error creating tour: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API/tours POST error:', error);
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
