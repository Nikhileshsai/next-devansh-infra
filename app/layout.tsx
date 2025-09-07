import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { getFooterContent } from '@/lib/supabase'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devansh Infra',
  description: 'Your Trusted Partner in Real Estate',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerContent = await getFooterContent();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider footerContent={footerContent}>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}