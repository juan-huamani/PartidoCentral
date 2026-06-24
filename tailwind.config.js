/** @type {import('tailwindcss').Config} */
module.exports = {
  // Archivos donde Tailwind busca las clases usadas. IMPORTANTE incluir los .js
  // (layout-loader.js genera el header/footer y panel.html arma tablas por JS).
  content: ['./*.html', './*.js'],
  theme: {
    extend: {
      colors: {
        'azul-institucional': '#0D2B5C',
        'azul-medio':         '#173A78',
        'azul-claro':         '#1E4A96',
        'amarillo-progreso':  '#F2C200',
        'amarillo-hover':     '#D9AE00',
        'gris-claro':         '#E5E7EB',
        'gris-medio':         '#9CA3AF',
        'gris-oscuro':        '#333333',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        body:  '500',
        title: '700',
        hero:  '900',
      },
      backgroundImage: {
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'slide-in':  'slideIn 0.6s ease forwards',
        'pulse-cta': 'pulseCta 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(32px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideIn:  { '0%': { opacity: '0', transform: 'translateX(-24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseCta: { '0%,100%': { boxShadow: '0 0 0 0 rgba(242,194,0,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(242,194,0,0)' } },
      },
    },
  },
  plugins: [],
};
