import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#E4E4E7', // Zinc-200
        input: '#E4E4E7',
        ring: '#49111C', // Oxblood Ring
        background: '#F8F4F0', // Warm Parchment
        foreground: '#1C1B1A', // Dark Charcoal
        primary: {
          DEFAULT: '#49111C', // Oxblood
          foreground: '#F8F4F0'
        },
        secondary: {
          DEFAULT: '#8C7A5E', // Antique Gold
          foreground: '#F8F4F0'
        },
        accent: {
          DEFAULT: '#8C7A5E', // Antique Gold
          foreground: '#F8F4F0'
        },
        // Heritage Palette (User Requested)
        'heritage-green': '#006400',
        'heritage-beige': '#F5F5DC',
        'heritage-maroon': '#800000',
        'heritage-terracotta': '#E2725B',
        
        // Atelier Palette
        parchment: '#F5F5DC', // Updated to Heritage Beige
        'paper-texture': '#F9F5F1',
        charcoal: '#1C1B1A',
        oxblood: '#800000', // Updated to Heritage Maroon
        gold: '#E2725B', // Updated to Heritage Terracotta for accents (or keep gold separate)
        
        // Architectural Minimalist Palette
        'arch-green': '#0A1F1C',
        'arch-white': '#F5F5DC', // Updated to User's Cream
        'arch-charcoal': '#1A1A1A',
        'arch-accent': '#E2725B', 

        // Legacy/System colors (mapped to new palette where appropriate or kept for utility)
        forest: '#1C1B1A', // Mapping forest to charcoal for text/elements
        rust: '#49111C', // Mapping rust to oxblood
        zinc: {
          600: '#52525b',
          200: '#E4E4E7',
        },
        
        destructive: {
          DEFAULT: '#ef4444', // Standard red
          foreground: '#FAFAFA'
        },
        muted: {
          DEFAULT: '#f4f4f5', // Zinc-100
          foreground: '#71717a' // Zinc-500
        },
        popover: {
          DEFAULT: '#F8F4F0',
          foreground: '#1C1B1A'
        },
        card: {
          DEFAULT: '#F8F4F0',
          foreground: '#1C1B1A'
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['Satoshi', 'var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-eb-garamond)', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'paper-grain': "url('/paper-grain.png')", // We will handle this with CSS or a simple pattern if no image
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scan-down': {
          '0%': { top: '-20%' },
          '100%': { top: '120%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 40s linear infinite', // Slower marquee
        'scan-down': 'scan-down 3s linear infinite',
      },
    }
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
