/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
      },
      fontFamily: {
        sans: ['Pretendard', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Pretendard', 'sans-serif'],
      },
      colors: {
        cream: '#FFF9F4',
        coral: {
          50: '#FFF1EE',
          100: '#FFE0D9',
          200: '#FFC2B5',
          300: '#FF9E8A',
          400: '#FF7A5E',
          500: '#FF5A5F',
          600: '#F23E54',
          700: '#D62847',
        },
        sunset: {
          400: '#FFB05E',
          500: '#FF8E53',
          600: '#FF6F47',
        },
        grape: {
          400: '#A88BEB',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
      },
      boxShadow: {
        glow: '0 20px 60px -15px rgba(255, 90, 95, 0.45)',
        soft: '0 10px 40px -10px rgba(80, 40, 30, 0.18)',
        glass: '0 8px 32px rgba(80, 40, 30, 0.12)',
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(135deg, #FF5A5F 0%, #FF8E53 50%, #FFB05E 100%)',
        'romance-gradient': 'linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-26px) rotate(6deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
      },
    },
  },
  plugins: [],
}
