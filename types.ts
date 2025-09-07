export type PropertyType = 'plot' | 'flat' | 'commercial' | 'agricultural' | 'villa' | 'all' | 'others';

export interface Amenity {
  icon: string;
  name: string;
}

export interface ListingDetails {
  amenities: Amenity[];
  connectivity: string;
  brochure_url?: string;
  youtube_embed_url?: string;
  note_en?: string;
  note_te?: string;
  
  // Plot
  area_sq_yards?: number;
  survey_no?: string;
  plot_number?: string;
  road_facing?: string;
  gated_community?: boolean;
  investment_features?: string;

  // Flat
  bhk?: number;
  sq_ft?: number;
  furnishing?: string;
  floor?: number;
  total_floors?: number;
  car_parking?: boolean;
  
  // Commercial - uses floor, sq_ft from Flat

  // Agricultural
  acres?: number;
  water_source?: string;
  // uses survey_no, investment_features from Plot

  // Villa
  private_pool?: boolean;
  // uses bhk, sq_ft, furnishing from Flat

  // Others
  area?: string;
}

export interface Listing {
  id: string;
  slug: string;
  type: PropertyType;
  location: string;
  price: string;
  image_urls: string[];
  map_embed: string;
  details: ListingDetails;
  title?: string; // Will be populated from translations
  description?: string; // Will be populated from translations
  // Translation fields for client-side language switching
  en_title?: string;
  en_description?: string;
  te_title?: string;
  te_description?: string;
}

export interface Blog {
  id: string;
  slug: string;
  cover_image: string; // Updated to match Supabase column name
  created_at: string;
  title?: string; // Will be populated from translations
  description?: string; // Will be populated from translations
  content?: string; // Will be populated from translations
  image_url?: string; // Added for internal use after mapping
  // Translation fields for client-side language switching
  en_title?: string;
  en_description?: string;
  en_content?: string;
  te_title?: string;
  te_description?: string;
  te_content?: string;
}

export interface Translation {
  listing_id?: string;
  blog_id?: string;
  title: string;
  description: string;
  content?: string;
}

export type Language = 'en' | 'te';
export type Theme = 'light' | 'dark';

export interface FooterContentType {
    company_name: string;
    hero_subtitle_en: string;
    hero_subtitle_te: string;
    contact_us_title_en: string;
    contact_us_title_te: string;
    phone_number: string;
    email: string;
    company_address: string;
    follow_us_title_en: string;
    follow_us_title_te: string;
    instagram_url: string;
    facebook_url: string;
    youtube_url: string;
    copyright_notice_en: string;
    copyright_notice_te: string;
}

export interface HeroContentType {
    background_image_url: string;
    hero_title_en: string;
    hero_title_te: string;
    hero_subtitle_en: string;
    hero_subtitle_te: string;
}

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  footerContent: FooterContentType | null;
}
