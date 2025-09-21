'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useAppContext } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import BlogCard from '@/components/BlogCard';
import { UI_TEXT } from '@/constants';
import Icon from '@/components/Icon';
import PropertyFilter from '@/components/PropertyFilter';
import { PropertyType, Listing, Blog, HeroContentType } from '@/types';

interface HomePageClientProps {
  listings: Listing[];
  blogs: Blog[];
  heroContent: HeroContentType | null;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ listings, blogs, heroContent }) => {
  const { language } = useAppContext();
  const text = UI_TEXT[language];
  const [activeFilter, setActiveFilter] = useState<PropertyType>('all');
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredListings = useMemo(() => {
    let filtered = listings;
    if (activeFilter !== 'all') {
        filtered = listings.filter(listing => listing.type === activeFilter);
    }
    // Limit to maximum 15 properties
    return filtered.slice(0, 15);
  }, [listings, activeFilter]);

  const scrollLeft = () => {
    const container = document.getElementById('properties-container');
    if (container) {
      const newPosition = Math.max(0, scrollPosition - 400);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('properties-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 400);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const heroTitle = language === 'te' ? heroContent?.hero_title_te : heroContent?.hero_title_en;
  const heroSubtitle = language === 'te' ? heroContent?.hero_subtitle_te : heroContent?.hero_subtitle_en;

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={heroContent?.background_image_url || "https://picsum.photos/seed/hero/1920/1080"} 
            alt="Hero background" 
            fill
            style={{objectFit: "cover"}}
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/35 dark:bg-black/55"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-[60vh] lg:h-[50vh]">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{heroTitle || text.heroTitle}</h1>
            <p className="mt-4 text-lg md:text-xl">{heroSubtitle || text.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <div className="relative">
            {/* Navigation Buttons - Only show on large screens */}
            <div className="hidden lg:block">
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-card-light dark:bg-card-dark shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Scroll left"
              >
                <Icon name="chevron_left" className="text-2xl text-primary" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-card-light dark:bg-card-dark shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Scroll right"
              >
                <Icon name="chevron_right" className="text-2xl text-primary" />
              </button>
            </div>
            
            <div 
              id="properties-container"
              className="flex overflow-x-auto space-x-8 py-4 -mx-4 px-4 no-scrollbar lg:px-16"
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {filteredListings.length > 0 ? filteredListings.map((property) => (
                <div key={property.id} className="w-80 md:w-96 flex-shrink-0">
                    <PropertyCard property={property} />
                </div>
              )) : (
                 <p className="w-full text-center text-secondary dark:text-gray-400">No properties found for this category.</p>
              )}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/properties" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors">
              {text.viewAllProperties}
              <Icon name="arrow_forward" className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="pt-0 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-8">{text.featuredBlogs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.id} blog={blog} isFeatured={true} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Link href="/blogs" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors">
              {text.viewAllBlogs}
              <Icon name="arrow_forward" className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageClient;
