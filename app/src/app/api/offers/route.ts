import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if env vars are available
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Offer = {
  id: string;
  title: string;
  description?: string;
  discountPercentage: number;
  tourId?: string;
};

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Database not configured' }, { status: 500 });
    }
    
    const { data: offers, error } = await supabase
      .from('offers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }

    return NextResponse.json(offers || []);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newOffer = await request.json();

    // Basic validation
    if (!newOffer.title || !newOffer.discountPercentage) {
      return NextResponse.json({ message: 'Missing required fields: title and discountPercentage' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ message: 'Database not configured' }, { status: 500 });
    }
    
    const { data, error } = await supabase
      .from('offers')
      .insert([{
        title: newOffer.title,
        description: newOffer.description || '',
        discountPerc: newOffer.discountPercentage,
        tourId: newOffer.tourId || null,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ message: 'Error writing data: ' + error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
