/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F1EA',
        'background-dark': '#2C2C26',
        foreground: '#3E3B35',
        'foreground-light': '#E0DCD3',
        accent: '#7D6B5D',
        'accent-sage': '#4A5D4E',
        highlight: '#C4A484',
        secondary: '#6B7B6B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
