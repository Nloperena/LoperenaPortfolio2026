/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
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
        border: '#8C7A5E33', // Gold low opacity
        input: '#8C7A5E33',
        ring: '#4A1010', 
        background: '#FAF9F6', // Warmer Cream/Soft Oatmeal
        foreground: '#1C1B1A', 
        primary: {
          DEFAULT: '#4A1010', // Deep Burgundy
          foreground: '#FAF9F6'
        },
        secondary: {
          DEFAULT: '#8C7A5E', // Antique Gold
          foreground: '#FAF9F6'
        },
        accent: {
          DEFAULT: '#1A2F28', // Dark Forest Green
          foreground: '#FAF9F6'
        },
        'heritage-green': '#1A2F28',
        'heritage-beige': '#FAF9F6',
        'heritage-maroon': '#4A1010',
        'heritage-gold': '#8C7A5E',
        'oxblood': '#4A1010',
        'gold': '#8C7A5E',
        'hunter-green': '#1A2F28',
        parchment: '#FAF9F6',
        charcoal: '#1C1B1A',
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#FAFAFA'
        },
        muted: {
          DEFAULT: '#8C7A5E1A', // Gold very low opacity
          foreground: '#1C1B1A99'
        },
        popover: {
          DEFAULT: '#FAF9F6',
          foreground: '#1C1B1A'
        },
        card: {
          DEFAULT: '#FAF9F6',
          foreground: '#1C1B1A'
        },
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px'
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'sans-serif'],
        serif: ['EB Garamond', 'Playfair Display', 'Lora', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'paper-grain': "url('/paper-texture.png')",
      },
      keyframes: {
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
        marquee: 'marquee 40s linear infinite',
        'scan-down': 'scan-down 3s linear infinite',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
