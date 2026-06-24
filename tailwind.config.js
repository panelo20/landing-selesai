/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0B3133',
        'brand-accent': '#DCFDA3',
        'neutral-bg': '#F6F5F2',
        'neutral-white': '#FFFFFF',
        'text-primary': '#0B3133',
        'text-muted': 'rgba(11, 49, 51, 0.7)',
        'text-on-dark': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Switzer', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
