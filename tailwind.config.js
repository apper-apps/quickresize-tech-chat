/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#5B21B6',
          600: '#7C3AED',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
  },
  plugins: [],
}