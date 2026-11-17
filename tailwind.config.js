/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#092C50',
          dark: '#061B35',
          light: '#13406D',
          hover: '#0c3866',
        },
        resqblue: {
          DEFAULT: '#0874C9',
          light: '#42A5E8',
          subtle: '#E8F3FC',
          hover: '#0761a7',
        },
        emergency: {
          DEFAULT: '#E53935',
          hover: '#C62828',
          light: '#FFEBEE',
        },
        surface: {
          bg: '#F7FAFE',
          card: '#FFFFFF',
          border: '#DFE8F1',
        },
        resqtext: {
          primary: '#10243B',
          secondary: '#62748A',
          muted: '#8A9BA8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 4px 20px -2px rgba(9, 44, 80, 0.08)',
        'clean-lg': '0 12px 32px -4px rgba(9, 44, 80, 0.12)',
        'phone': '0 25px 60px -15px rgba(9, 44, 80, 0.25), 0 0 0 1px rgba(9, 44, 80, 0.05)',
      }
    },
  },
  plugins: [],
}

