import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        login: fileURLToPath(new URL('./login.html', import.meta.url)),
        painel: fileURLToPath(new URL('./painel.html', import.meta.url)),
        sobre: fileURLToPath(new URL('./sobre.html', import.meta.url)),
        cursos: fileURLToPath(new URL('./cursos.html', import.meta.url)),
        diretoria: fileURLToPath(new URL('./diretoria.html', import.meta.url)),
        contato: fileURLToPath(new URL('./contato.html', import.meta.url)),
      },
    },
  },
});
