import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side data fetching functions for ISR
export async function getListings() {
  const { data: listingsData, error: listingsError } = await supabase
    .from('listings')
    .select('*')
    .limit(15);

  if (listingsError) {
    console.error('Error fetching listings:', listingsError);
    return [];
  }

  const { data: listingTranslationsEn, error: enError } = await supabase
    .from('listing_translations')
    .select('*');

  const { data: listingTranslationsTe, error: teError } = await supabase
    .from('listing_translations_telugu')
    .select('*');

  if (enError || teError) {
    console.error('Error fetching listing translations:', enError || teError);
    return listingsData || [];
  }

  // Return listings with both English and Telugu translations for client-side language switching
  const translatedListings = (listingsData || []).map(listing => {
    const enTranslation = listingTranslationsEn?.find(t => t.listing_id === listing.id);
    const teTranslation = listingTranslationsTe?.find(t => t.listing_id === listing.id);
    
    return {
      ...listing,
      // Include both translations for client-side switching
      en_title: enTranslation?.title || listing.title || 'No Title',
      en_description: enTranslation?.description || listing.description || 'No Description',
      te_title: teTranslation?.title || listing.title || 'No Title',
      te_description: teTranslation?.description || listing.description || 'No Description',
      // Default to English for initial render
      title: enTranslation?.title || listing.title || 'No Title',
      description: enTranslation?.description || listing.description || 'No Description',
    };
  });

  return translatedListings;
}

export async function getBlogs() {
  const { data: blogsData, error: blogsError } = await supabase
    .from('blogs')
    .select('*');

  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return [];
  }

  const { data: blogTranslationsTe, error: blogTeError } = await supabase
    .from('blog_translations')
    .select('*');

  if (blogTeError) {
    console.error('Error fetching blog translations:', blogTeError);
    return blogsData || [];
  }

  // Return blogs with both English and Telugu translations for client-side language switching
  const translatedBlogs = (blogsData || []).map(blog => {
    const teTranslation = blogTranslationsTe?.find(t => t.blog_id === blog.id);
    
    return {
      ...blog,
      image_url: blog.cover_image,
      // Include both translations for client-side switching
      en_title: blog.title || 'No Title',
      en_description: blog.description || 'No Description',
      en_content: blog.description || 'No Content',
      te_title: teTranslation?.title || blog.title || 'No Title',
      te_description: teTranslation?.description || blog.description || 'No Description',
      te_content: teTranslation?.description || 'No Content',
      // Default to English for initial render
      title: blog.title || 'No Title',
      description: blog.description || 'No Description',
      content: blog.description || 'No Content',
    };
  });

  return translatedBlogs;
}

export async function getPropertyBySlug(slug: string) {
  const { data: property, error } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !property) {
    return null;
  }

  const { data: enTranslation } = await supabase
    .from('listing_translations')
    .select('*')
    .eq('listing_id', property.id)
    .single();

  const { data: teTranslation } = await supabase
    .from('listing_translations_telugu')
    .select('*')
    .eq('listing_id', property.id)
    .single();

  return {
    ...property,
    // Include both translations for client-side switching
    en_title: enTranslation?.title || property.title || 'No Title',
    en_description: enTranslation?.description || property.description || 'No Description',
    te_title: teTranslation?.title || property.title || 'No Title',
    te_description: teTranslation?.description || property.description || 'No Description',
    // Default to English for initial render
    title: enTranslation?.title || property.title || 'No Title',
    description: enTranslation?.description || property.description || 'No Description',
  };
}

export async function getBlogBySlug(slug: string) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    return null;
  }

  const { data: teTranslation } = await supabase
    .from('blog_translations')
    .select('*')
    .eq('blog_id', blog.id)
    .single();

  return {
    ...blog,
    image_url: blog.cover_image,
    // Include both translations for client-side switching
    en_title: blog.title || 'No Title',
    en_description: blog.description || 'No Description',
    en_content: blog.description || 'No Content',
    te_title: teTranslation?.title || blog.title || 'No Title',
    te_description: teTranslation?.description || blog.description || 'No Description',
    te_content: teTranslation?.description || 'No Content',
    // Default to English for initial render
    title: blog.title || 'No Title',
    description: blog.description || 'No Description',
    content: blog.description || 'No Content',
  };
}

export async function getAllPropertySlugs() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('slug')
    .limit(15);

  if (error) {
    console.error('Error fetching property slugs:', error);
    return [];
  }

  return listings?.map(listing => listing.slug) || [];
}

export async function getAllBlogSlugs() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('slug');

  if (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }

  return blogs?.map(blog => blog.slug) || [];
}

export async function getFooterContent() {
  const { data, error } = await supabase
    .from('footer_content')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }

  return data;
}

export async function getHeroContent() {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .single();
  
    if (error) {
      console.error('Error fetching hero content:', error);
      return null;
    }
  
    return data;
  }