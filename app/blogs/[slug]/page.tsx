import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogDetailClient from './BlogDetailClient';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog not found',
    }
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      images: [
        {
          url: blog.image_url,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.content.substring(0, 160),
      images: [blog.image_url],
    },
    alternates: {
      canonical: `${process.env.SITE_URL}/blogs/${params.slug}`,
    },
  }
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// This is now a server component that fetches data at build time
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = params;
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
