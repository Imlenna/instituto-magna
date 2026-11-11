// Paleta preto / dourado / rosa.
// O HTML continua usando as classes blue / amber / cyan do Tailwind;
// aqui elas são redefinidas para as cores novas.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // antigo azul -> preto/grafite com toques de ouro
        blue: {
          100: '#f6ecc4', 200: '#e8d28a', 300: '#c9a94a', 400: '#d4af37',
          500: '#a8872a', 800: '#2a2a2a', 900: '#141414', 950: '#0a0a0a',
        },
        // antigo âmbar -> dourado
        amber: { 400: '#e6c65c', 500: '#d4af37', 700: '#9a7b1f' },
        // terminal secreto -> dourado
        cyan: {
          200: '#f6ecc4', 300: '#e8d28a', 400: '#e6c65c', 500: '#d4af37',
          600: '#a8872a', 800: '#5c4a14', 900: '#2b2308', 950: '#16120a',
        },
      },
    },
  },
};
