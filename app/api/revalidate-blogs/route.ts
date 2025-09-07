import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    // Verify the secret key
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate blog-related pages
    revalidatePath('/');
    revalidatePath('/blogs');
    revalidatePath('/blogs/[slug]', 'page');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating blogs' }, { status: 500 });
  }
}
