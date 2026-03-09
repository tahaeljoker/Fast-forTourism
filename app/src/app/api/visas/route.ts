import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Visa = {
  id: string;
  country: string;
  type: string;
  processingTime?: string;
  price: number;
};

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { data: visas, error } = await supabase.from('visas').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: `Error fetching visas: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json(visas || []);
  } catch (error) {
    console.error('API/visas GET error:', error);
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const newVisa = await request.json();

    // Basic validation
    if (!newVisa.country || !newVisa.type || !newVisa.price) {
      return NextResponse.json({ message: 'Missing required fields: country, type, and price' }, { status: 400 });
    }

    const { data, error } = await supabase.from('visas').insert([newVisa]).select().single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ message: `Error creating visa: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API/visas POST error:', error);
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
