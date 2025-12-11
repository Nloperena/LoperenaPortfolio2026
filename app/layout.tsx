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
      <body className="font-serif font-normal antialiased text-[#111111] dark:bg-[#0A1F1C] dark:text-[#F5F5DC] transition-colors duration-300" style={{ 
        backgroundColor: '#252525',
        backgroundImage: `
          repeating-linear-gradient(45deg, #252525 0px, #1f1f1f 1px, #252525 2px, #252525 10px),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.05) 3px)
        `,
        backgroundSize: '10px 10px, 4px 4px'
      }}>
        {/* SVG Filters for Ink Bleed and Halftone Effects */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="ink-bleed-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
              <feGaussianBlur stdDeviation="0.3" />
            </filter>
            <filter id="halftone-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 0.3 0.7 1"/>
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
        </svg>
        
        {/* Wolf and Tree Watermark - Very subtle, fixed background */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat etching-style"
            style={{
              backgroundImage: 'url(/oakandtree.svg)',
              backgroundSize: '60%',
              backgroundPosition: 'center',
              filter: 'brightness(0) invert(0.3) contrast(1.4) grayscale(0.3)',
            }}
          />
        </div>
        
        {/* Print Plate Border - Double Line Style */}
        <div className="fixed inset-4 border-[#111111]/10 pointer-events-none z-[100] hidden md:block" style={{ borderStyle: 'double', borderWidth: '3px' }} />
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}



