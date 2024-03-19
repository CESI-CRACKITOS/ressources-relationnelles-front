/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      'colors': {
        'gouv-gray': {
          300: '#F6F6F6',
          400: '#EDEDED'
        },
        'gouv-blue': {
          500: "#000091"
        }
      },
    },
  },
  plugins: [],
}

