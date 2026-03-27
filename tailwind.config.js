/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,md,mdx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2dd4bf',
        primary: '#404040',
        muted: '#949494',
        heading: '#000000',
        'card-bg': '#f5f7fa',
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        decorative: ['Caveat', 'cursive'],
        serif: ['ET Book', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
