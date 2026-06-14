/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#E5E5E5',
        'background-dark': '#0D0D0D',
        foreground: '#0D0D0D',
        'foreground-light': '#F5F5F5',
        accent: '#0D0D0D',
        highlight: '#B5CEAA',
        'highlight-muted': '#8FA882',
        secondary: '#737373',
        concrete: '#D4D4D4',
        signal: '#FF3300',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        brutal: '4px 4px 0 0 #0D0D0D',
        'brutal-lg': '8px 8px 0 0 #0D0D0D',
        'brutal-sm': '2px 2px 0 0 #0D0D0D',
      },
      borderWidth: {
        brutal: '3px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
