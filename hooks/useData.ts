'use client';

import { useState, useEffect } from 'react';
import { Listing, Blog, Language } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { supabase } from '@/services/supabaseClient';

function useData() {
  const { language } = useAppContext();
  const [listings, setListings] = useState<Listing[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndTranslateData = async () => {
      setLoading(true);

      // Fetch listings and their translations
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*');

      const { data: listingTranslationsEn, error: enError } = await supabase
        .from('listing_translations')
        .select('*');

      const { data: listingTranslationsTe, error: teError } = await supabase
        .from('listing_translations_telugu')
        .select('*');

      if (listingsError || enError || teError) {
        console.error('Error fetching listings or translations:', listingsError || enError || teError);
        setLoading(false);
        return;
      }

      const listingTranslations = language === 'en' ? listingTranslationsEn : listingTranslationsTe;
      const translatedListings = (listingsData || []).map(listing => {
        const translation = listingTranslations.find(t => t.listing_id === listing.id);
        return {
          ...listing,
          title: translation?.title || 'No Title',
          description: translation?.description || 'No Description',
        };
      });
      setListings(translatedListings);

      // Fetch blogs and their translations
      const { data: blogsData, error: blogsError } = await supabase
        .from('blogs')
        .select('*');

      const { data: blogTranslationsTe, error: blogTeError } = await supabase
        .from('blog_translations')
        .select('*');

      if (blogsError || blogTeError) {
        console.error('Error fetching blogs or translations:', blogsError || blogTeError);
        setLoading(false);
        return;
      }

      const translatedBlogs = (blogsData || []).map(blog => {
          const translation = blogTranslationsTe.find(t => t.blog_id === blog.id);
          return {
              ...blog,
              // Map cover_image to image_url for compatibility
              image_url: blog.cover_image,
              // For English: use data from blogs table
              // For Telugu: use data from blog_translations table
              title: language === 'en' 
                ? (blog.title || 'No Title')
                : (translation?.title || blog.title || 'No Title'),
              description: language === 'en'
                ? (blog.description || 'No Description')
                : (translation?.description || blog.description || 'No Description'),
              content: language === 'en'
                ? (blog.description || 'No Content') // For English, use description as content
                : (translation?.description || 'No Content'), // For Telugu, use translated description as content
          }
      });
      setBlogs(translatedBlogs);

      setLoading(false);
    };

    fetchAndTranslateData();
  }, [language]);

  return { listings, blogs, loading };
}

export default useData;
