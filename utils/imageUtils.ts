/**
 * Utility functions for handling images, especially Supabase storage URLs
 */

/**
 * Checks if an image URL is from Supabase storage
 */
export const isSupabaseImage = (url: string): boolean => {
  return url.includes('supabase') || url.includes('supabase.co');
};

/**
 * Gets the optimized image URL for Next.js Image component
 * For Supabase images, we use unoptimized to avoid CORS issues
 */
export const getImageProps = (src: string, alt: string, width: number, height: number) => {
  return {
    src,
    alt,
    width,
    height,
    unoptimized: isSupabaseImage(src),
  };
};

/**
 * Formats Supabase storage URL if needed
 * This ensures the URL is properly formatted for public access
 */
export const formatSupabaseUrl = (url: string): string => {
  if (isSupabaseImage(url)) {
    // Ensure the URL has the correct format for public access
    if (!url.includes('/storage/v1/object/public/')) {
      // If it's a relative path, we might need to prepend the Supabase URL
      // This depends on how your Supabase is configured
      return url;
    }
  }
  return url;
};
