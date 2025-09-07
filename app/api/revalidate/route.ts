import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, type, table } = body;

    // Verify the secret key
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Check if this is a Supabase webhook
    if (type === 'INSERT' || type === 'UPDATE' || type === 'DELETE') {
      // Revalidate the relevant pages based on the table
      if (table === 'listings') {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/revalidate-properties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ secret: process.env.REVALIDATE_SECRET }),
        });
      } else if (table === 'blogs' || table === 'blog_translations') {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/revalidate-blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ secret: process.env.REVALIDATE_SECRET }),
        });
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
