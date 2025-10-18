import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { getFooterContent } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'R.S. Estate',
  description: 'Your Trusted Partner in Real Estate',
  keywords: 'VizagRealEstate, VisakhapatnamProperty, VizagFlats, PropertyForSaleVizag, VizagHomes, VisakhapatnamApartments, VizagRealtors, VizagPlots, RealEstateAgencyVizag, BuyPropertyVizag',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerContent = await getFooterContent();

  return (
    <html lang="en">
      <body className="font-sans bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
        <AppProvider footerContent={footerContent}>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}