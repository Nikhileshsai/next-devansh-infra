import React from 'react';
import { getBlogs } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogsClient from './BlogsClient';

// This is now a server component that fetches data at build time
export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen bg-grey-800 dark:bg-[#333333]">
      <Header />
      <main className="flex-grow">
        <BlogsClient blogs={blogs} />
      </main>
      <Footer />
    </div>
  );
}
