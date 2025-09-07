import { getBlogs, getListings, getHeroContent } from '@/lib/supabase';
import HomePageClient from './HomePageClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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