import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogDetailClient from './BlogDetailClient';

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// This is now a server component that fetches data at build time
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Header />
      <main className="flex-grow">
        <BlogDetailClient blog={blog} />
      </main>
      <Footer />
    </div>
  );
}
