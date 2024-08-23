import type { Config } from "tailwindcss"

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1280px',
        '2xl': '1440px',
      },
      colors: {
        'dark-brown' : 'rgba(252, 202, 77, 0.2)',
        'text-gradient': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 22.22%, #EDCC32 66.99%, #FED649 84.51%)',
        'border-gray': 'rgba(255, 255, 255, 0.25)',
        'text-gray': 'rgba(255, 255, 255, 0.80)',
        'brown-gold': 'rgba(221, 166, 39, 0.80)',
        'light-black': 'rgba(30, 30, 30, 0.90)',
        'gold-border': 'rgba(180, 123, 43, 0.3)',
        'gold-text': 'rgba(180, 123, 43, 1)',
        'gray-light': 'rgba(102, 113, 133, 1)',
        'dark-blue': 'rgba(16, 25, 40, 1)',
        'gray-border': 'rgba(208, 213, 221, 1)',
        'error': "#800501"
      },
      boxShadow: {
        'header-shadow': '0px 4px 40px 0px rgba(0, 0, 0, 0.10)',
        'incentives-shadow': '0px 4px 14px 0px rgba(0, 0, 0, 0.25)',
        'btn-shadow': '0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)',
      },
      backgroundColor: {
        'banner-layer': 'rgba(0, 0, 0, 0.70)',
        'sign-in-layer': 'rgba(30, 30, 30, 0.4)',
      },
      backgroundImage: {
        'btn-gold': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 0.01%)',
        'text-gradient': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 22.22%, #EDCC32 66.99%, #FED649 84.51%)',
        'btn-gradient': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 0.01%)',
      },
      fontFamily: {
        'open-sans': ['"Open Sans", sans-serif'],
        'roboto': ['"Roboto", sans-serif'],
        'libre-franklin': ['"Libre Franklin", sans-serif'],
        'inter': ['"Inter", sans-serif'],
        'poppins-black': ['"Poppins", sans-serif'],
        'work-sans': ['"Work Sans", sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config

export default config