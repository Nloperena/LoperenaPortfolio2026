import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nico Loperena - Digital Architect | Building Scalable Systems',
  description: 'Nico Loperena is a Digital Architect helping businesses build scalable digital empires. From historical foundations to modern code that drives growth.',
  keywords: ['Digital Architect', 'Web Development', 'Next.js', 'React', 'Scalable Systems', 'Nico Loperena', 'Portfolio', 'Software Engineer'],
  openGraph: {
    title: 'Nico Loperena - Digital Architect',
    description: 'Crafting digital foundations for tomorrow\'s enterprises.',
    type: 'website',
    url: 'https://nicoloperena.com',
    siteName: 'Nico Loperena',
    locale: 'en_US',
    images: [
      {
        url: 'https://nicoloperena.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nico Loperena - Digital Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nico Loperena - Digital Architect',
    description: 'Crafting digital foundations for tomorrow\'s enterprises.',
    creator: '@nicoloperena',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nico Loperena',
  url: 'https://nicoloperena.com',
  jobTitle: 'Digital Architect',
  sameAs: [
    'https://www.linkedin.com/in/nicholas-loperena-022813185/',
    'https://github.com/nicoloperena',
    'https://twitter.com/nicoloperena'
  ],
  description: 'Nico Loperena is a Digital Architect helping businesses build scalable digital empires.',
  knowsAbout: ['Web Development', 'React', 'Next.js', 'System Architecture', 'Scalability'],
}

import { EB_Garamond, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans font-medium antialiased bg-[#F5F5DC] text-[#1C1B1A] dark:bg-[#0A1F1C] dark:text-[#F5F5DC] transition-colors duration-300">
        {/* Print Plate Border */}
        <div className="fixed inset-4 border border-[#1C1B1A]/10 pointer-events-none z-[100] hidden md:block" />
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}



