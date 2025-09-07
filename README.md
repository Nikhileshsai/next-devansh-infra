# Devansh Infra - Next.js Version

This is a Next.js version of the Devansh Infra real estate website, converted from the original Vite React application.

## Features

- **Modern Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Dark/Light theme** support
- **Multi-language** support (English/Telugu)
- **Responsive design** for all devices
- **Property listings** with filtering
- **Blog system** with detailed pages
- **Contact form** with Google Sheets integration
- **WhatsApp integration** for property inquiries

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Sheets API Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=your_google_service_account_email_here
GOOGLE_SHEETS_PRIVATE_KEY=your_google_service_account_private_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_google_sheets_id_here

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# ISR Revalidation (32-bit security key for Supabase webhooks)
REVALIDATE_SECRET=your_32_bit_security_key_here

# Base URL for revalidation (your production URL)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
next-devansh-infra/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── properties/        # Property pages
│   ├── blogs/            # Blog pages
│   ├── about/            # About page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable components
├── context/             # React context providers
├── hooks/               # Custom hooks
├── services/            # External service integrations
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
└── tailwind.config.js  # Tailwind CSS configuration
```

## Key Differences from Vite Version

1. **Routing**: Uses Next.js App Router instead of React Router
2. **Server-side rendering**: Better SEO and performance
3. **API routes**: Built-in API endpoints instead of Vercel functions
4. **Environment variables**: Uses Next.js environment variable system
5. **Client components**: Uses 'use client' directive for interactive components
6. **Image optimization**: Built-in Next.js Image component support
7. **Fixed Material Icons**: Proper CSS import order for Google Material Icons
8. **Supabase Image Support**: Configured Next.js to handle Supabase storage images
9. **Blog Content Fix**: Proper language-based content fetching from blog_translations table

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This Next.js application can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Google Sheets API
- Material Icons
