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

// GET a single visa by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const { data: visa, error } = await supabase.from('visas').select('*').eq('id', id).single();

    if (error || !visa) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json(visa);
  } catch {
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// DELETE a visa by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const { error } = await supabase.from('visas').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Visa deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

// PUT (update) a visa by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabase) {
      return NextResponse.json({ message: 'Supabase client not initialized' }, { status: 500 });
    }
    const { id } = await params;
    const updatedVisaData = await request.json();
    
    // Basic validation
    if (!updatedVisaData.country || !updatedVisaData.type || !updatedVisaData.price) {
      return NextResponse.json({ message: 'Missing required fields: country, type, and price' }, { status: 400 });
    }

    const { data, error } = await supabase.from('visas').update(updatedVisaData).eq('id', id).select().single();

    if (error || !data) {
      return NextResponse.json({ message: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}
