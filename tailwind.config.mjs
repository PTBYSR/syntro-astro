/** @type {import('tailwindcss').Config} */
export default {
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        black: '#121212',
        accent: {
          25: '#f6f8fb',
          50: '#edf2fa',
          100: '#d9e5f7',
          200: '#b7cdf1',
          300: '#8aaee8',
          400: '#5a89db',
          500: '#3165ca',
          600: '#0d2b59',  // ← new base (replaces #0065ff)
          700: '#0a2348',
          800: '#081c39',
          900: '#06152b',
          950: '#040e1eff',
        },

        main: {
          400: "#ee66aa",
          500: "#921253"
        },

      

        base: {
          25: '#fafafa',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7ebff',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
