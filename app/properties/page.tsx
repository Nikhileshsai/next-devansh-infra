import React from 'react';
import { getListings } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertiesClient from './PropertiesClient';

// This is now a server component that fetches data at build time
export default async function PropertiesPage() {
  const listings = await getListings();

  return (
    <div className="flex flex-col min-h-screen bg-grey-800 dark:bg-[#333333]">
      <Header />
      <main className="flex-grow">
        <PropertiesClient listings={listings} />
      </main>
      <Footer />
    </div>
  );
}
