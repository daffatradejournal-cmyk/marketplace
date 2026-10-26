/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#d9532b',
          dark: '#b83f1b',
        },
        surface: {
          DEFAULT: '#ffffff',
          warm: '#faf8f5',
          soft: '#f5f1eb',
          border: '#e8e2d9',
        },
        whatsapp: {
          light: '#25D366',
          DEFAULT: '#128C7E',
          dark: '#075E54',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)',
        'card': '0 4px 20px rgba(28, 25, 23, 0.06), 0 1px 4px rgba(28, 25, 23, 0.03)',
        'elevated': '0 12px 36px rgba(28, 25, 23, 0.12), 0 4px 12px rgba(28, 25, 23, 0.05)',
      }
    },
  },
  plugins: [],
}
