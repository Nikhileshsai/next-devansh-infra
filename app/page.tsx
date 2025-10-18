import { getBlogs, getListings, getHeroContent } from '@/lib/supabase';
import HomePageClient from './HomePageClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate in Visakhapatnam | Buy Property in Vizag',
  description: 'Vizag Properties for Sale | Trusted Real Estate Agency | Visakhapatnam Real Estate Market | Flats & Plots for Sale | Buy, Sell & Rent Property in Vizag | Top Realtors | Best Real Estate Deals in Visakhapatnam | Verified Listings',
};

export default async function Home() {
  const listings = await getListings();
  const blogs = await getBlogs();
  const heroContent = await getHeroContent();

  return (
    <>
      <Header />
      <HomePageClient listings={listings} blogs={blogs} heroContent={heroContent} />
      <Footer />
    </>
  );
}