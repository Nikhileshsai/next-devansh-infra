import React from 'react';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getAllPropertySlugs } from '@/lib/supabase';
import Icon from '@/components/Icon';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import { WHATSAPP_NUMBER } from '@/constants';
import { UI_TEXT } from '@/constants';
import { ListingDetails, PropertyType } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailClient from './PropertyDetailClient';

// Generate static params for all property slugs
export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// This is now a server component that fetches data at build time
export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-grey-800 dark:bg-[#333333] text-text-light dark:text-text-dark">
      <Header />
      <main className="flex-grow">
        <PropertyDetailClient property={property} />
      </main>
      <Footer />
    </div>
  );
}
