import { contasHeroisDB, getHeroiPorCodinome } from './herois-db.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const userInput = document.getElementById('userInput');
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!userInput || !passwordInput) {
        console.error('Campos de formulário não encontrados!');
        return;
      }

      const userVal = userInput.value.trim();
      const passVal = passwordInput.value.trim();

      const heroi = getHeroiPorCodinome(userVal);

      if (heroi && passVal === heroi.senha) {
        if (errorMessage) errorMessage.classList.add('hidden');
        try {
          localStorage.setItem('usuarioLogado', JSON.stringify({ codinome: heroi.codinome }));
          window.location.href = './painel.html';
        } catch (error) {
          console.error('Não foi possível salvar a sessão do aluno.', error);
          if (errorMessage) {
            errorMessage.textContent = 'Não foi possível iniciar a sessão neste navegador.';
            errorMessage.classList.remove('hidden');
          }
        }
      } else {
        if (errorMessage) {
          errorMessage.textContent = 'Usuário ou senha inválidos.';
          errorMessage.classList.remove('hidden');
        }
      }
    });
  }
});
