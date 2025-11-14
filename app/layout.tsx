import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nico Loperena - Digital Architect',
  description: 'Crafting digital foundations for tomorrow\'s enterprises. Architecture, Innovation, Deployment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

