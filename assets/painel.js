import { getHeroiPorCodinome, contasHeroisDB } from './herois-db.js';
import { buscarTopSecret } from './top-secret.js';
import { PILARES } from './aulas-data.js';
import { CARTEIRINHAS } from './carteirinhas.js';

document.addEventListener('DOMContentLoaded', () => {
  let savedUser;
  try {
    savedUser = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  } catch (error) {
    console.error('A sessão salva do aluno não pôde ser lida.', error);
    window.location.replace('./login.html');
    return;
  }

  const usuario = getHeroiPorCodinome(savedUser?.codinome);
  if (!usuario) {
    window.location.replace('./login.html');
    return;
  }

  const nomeHeader = document.getElementById('nomeHeader');
  const saudacao = document.getElementById('saudacao');
  const infoAluno = document.getElementById('infoAluno');
  const biografiaAluno = document.getElementById('biografiaAluno');
  const disciplinasAluno = document.getElementById('disciplinasAluno');
  const minhaGrade = document.getElementById('minhaGrade');
  const gradeMensagem = document.getElementById('gradeMensagem');
  const carteirinhaImagem = document.getElementById('carteirinhaImagem');
  const carteirinhaIndisponivel = document.getElementById('carteirinhaIndisponivel');
  const abrirCarteirinha = document.getElementById('abrirCarteirinha');
  const carteirinhaModal = document.getElementById('carteirinhaModal');
  const carteirinhaImagemAmpliada = document.getElementById('carteirinhaImagemAmpliada');
  const fecharCarteirinha = document.getElementById('fecharCarteirinha');

  nomeHeader.textContent = usuario.nome;
  saudacao.textContent = `Bem-vindo(a), ${usuario.nome}`;

  const equipe = document.createElement('span');
  equipe.className = 'bg-blue-900/80 text-amber-300 px-3 py-1 rounded border border-amber-500/30 font-medium';
  equipe.textContent = `Equipe: ${usuario.equipe}`;
  const heroName = document.createElement('span');
  heroName.className = 'bg-pink-950/80 text-pink-300 px-3 py-1 rounded border border-pink-500/30 font-medium';
  heroName.textContent = `Herói: ${usuario.codinome.toUpperCase()}`;
  const age = document.createElement('span');
  age.className = 'bg-slate-900/80 text-slate-100 px-3 py-1 rounded border border-slate-400/30 font-medium';
  age.textContent = `Idade: ${usuario.idade}`;
  infoAluno.append(equipe, heroName, age);

  const addProfileRow = (label, value) => {
    const row = document.createElement('p');
    const title = document.createElement('strong');
    title.className = 'text-blue-950';
    title.textContent = `${label}: `;
    row.append(title, document.createTextNode(value));
    biografiaAluno.append(row);
  };

  addProfileRow('Nome civil', usuario.nome);
  addProfileRow('Equipe atual', usuario.equipe);
  addProfileRow('Poderes', usuario.poderes);
  if (usuario.frase) {
    const phrase = document.createElement('p');
    phrase.className = 'italic text-amber-700 border-l-2 border-amber-500 pl-3';
    phrase.textContent = `“${usuario.frase}”`;
    biografiaAluno.append(phrase);
  }

  const carteirinha = CARTEIRINHAS[usuario.codinome];
  if (carteirinha) {
    carteirinhaImagem.src = carteirinha;
    carteirinhaImagem.alt = `Carteirinha de ${usuario.nome} (${usuario.codinome})`;
    abrirCarteirinha.classList.remove('hidden');
    carteirinhaImagemAmpliada.src = carteirinha;
    carteirinhaImagemAmpliada.alt = carteirinhaImagem.alt;
  } else {
    carteirinhaIndisponivel.classList.remove('hidden');
  }

  const gradeStorageKey = `instituto_grade_${usuario.codinome}`;
  const todasDisciplinas = PILARES.flatMap((pilar) => pilar.disciplinas);
  const disciplinasDisponiveis = new Set(todasDisciplinas.map((disciplina) => disciplina.id));
  let disciplinasSelecionadas = new Set();
  let avisoPersistencia = '';

  function lerGradeSalva(valor) {
    const savedGrade = JSON.parse(valor || '[]');
    if (!Array.isArray(savedGrade) || savedGrade.some((id) => typeof id !== 'string')) {
      throw new Error('O formato da grade salva é inválido.');
    }
    return new Set(savedGrade.filter((id) => disciplinasDisponiveis.has(id)));
  }

  try {
    disciplinasSelecionadas = lerGradeSalva(localStorage.getItem(gradeStorageKey));
  } catch (error) {
    console.error('Não foi possível carregar a grade curricular salva.', error);
    avisoPersistencia = 'Não foi possível carregar a grade salva neste navegador.';
  }

  function renderGrade() {
    disciplinasAluno.replaceChildren();
    minhaGrade.replaceChildren();

    if (avisoPersistencia) {
      gradeMensagem.textContent = avisoPersistencia;
      gradeMensagem.className = 'text-sm text-red-600 mt-2';
    } else if (disciplinasSelecionadas.size === 0) {
      gradeMensagem.textContent = 'Nenhuma disciplina adicionada. Use + para montar sua grade.';
      gradeMensagem.className = 'text-sm text-slate-500 mt-2';
    } else {
      gradeMensagem.textContent = `${disciplinasSelecionadas.size} disciplina(s) na sua grade.`;
      gradeMensagem.className = 'text-sm text-emerald-700 mt-2';
    }

    for (const pilar of PILARES) {
      const section = document.createElement('section');
      const heading = document.createElement('h4');
      heading.className = 'font-bold text-blue-950';
      heading.textContent = pilar.nome;
      const list = document.createElement('ul');
      list.className = 'mt-2 space-y-2';

      for (const disciplina of pilar.disciplinas) {
        const item = document.createElement('li');
        item.className = 'flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2';
        const name = document.createElement('span');
        name.className = 'min-w-0 text-sm text-slate-700';
        name.textContent = disciplina.nome;

        const isSelected = disciplinasSelecionadas.has(disciplina.id);
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = isSelected
          ? 'shrink-0 h-9 w-9 rounded-full bg-pink-100 text-pink-800 font-bold hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500'
          : 'shrink-0 h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500';
        toggle.textContent = isSelected ? '−' : '+';
        toggle.setAttribute('aria-label', `${isSelected ? 'Remover' : 'Adicionar'} ${disciplina.nome} ${isSelected ? 'da' : 'à'} minha grade`);
        toggle.setAttribute('aria-pressed', String(isSelected));
        toggle.addEventListener('click', () => {
          if (disciplinasSelecionadas.has(disciplina.id)) {
            disciplinasSelecionadas.delete(disciplina.id);
          } else {
            disciplinasSelecionadas.add(disciplina.id);
          }

          try {
            localStorage.setItem(gradeStorageKey, JSON.stringify([...disciplinasSelecionadas]));
            avisoPersistencia = '';
          } catch (error) {
            console.error('Não foi possível salvar a grade curricular.', error);
            avisoPersistencia = 'A alteração está ativa nesta sessão, mas não pôde ser salva neste navegador.';
          }
          renderGrade();
        });

        item.append(name, toggle);
        list.append(item);
      }

      section.append(heading, list);
      disciplinasAluno.append(section);
    }

    for (const disciplina of todasDisciplinas) {
      if (!disciplinasSelecionadas.has(disciplina.id)) continue;
      const item = document.createElement('li');
      item.className = 'rounded-lg bg-amber-50 px-3 py-2 text-sm text-blue-950';
      item.textContent = disciplina.nome;
      minhaGrade.append(item);
    }
  }

  renderGrade();

  window.addEventListener('storage', (event) => {
    if (event.key !== gradeStorageKey) return;

    try {
      disciplinasSelecionadas = lerGradeSalva(event.newValue);
      avisoPersistencia = '';
    } catch (error) {
      console.error('Não foi possível atualizar a grade com os dados de outra aba.', error);
      avisoPersistencia = 'Não foi possível atualizar a grade salva neste navegador.';
    }

    renderGrade();
  });

  abrirCarteirinha.addEventListener('click', () => {
    carteirinhaModal.classList.remove('hidden');
    carteirinhaModal.classList.add('flex');
    fecharCarteirinha.focus();
  });

  function fecharModalCarteirinha() {
    carteirinhaModal.classList.add('hidden');
    carteirinhaModal.classList.remove('flex');
    abrirCarteirinha.focus();
  }

  fecharCarteirinha.addEventListener('click', fecharModalCarteirinha);
  carteirinhaModal.addEventListener('click', (event) => {
    if (event.target === carteirinhaModal) fecharModalCarteirinha();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !carteirinhaModal.classList.contains('hidden')) {
      fecharModalCarteirinha();
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = './login.html';
  });

  const trigger = document.getElementById('terminalEasterEggTrigger');
  const modal = document.getElementById('easterEggModal');
  const closeButton = document.getElementById('fecharEasterEggBtn');
  const loginForm = document.getElementById('formLoginRestrito');
  const passwordInput = document.getElementById('senhaRestritaInput');
  const errorMessage = document.getElementById('erroSenhaMsg');
  const loginPhase = document.getElementById('faseLoginRestrito');
  const terminalPhase = document.getElementById('faseTerminalCLI');
  const output = document.getElementById('terminalOutput');
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInputCLI');
  let terminalUnlocked = false;

  function closeTerminal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    trigger.focus();
  }

  function openTerminal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (terminalUnlocked) {
      terminalInput.focus();
    } else {
      passwordInput.focus();
    }
  }

  function printLine(text, className = 'text-emerald-300') {
    const line = document.createElement('p');
    line.className = `font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${className}`;
    line.textContent = text;
    output.append(line);
    output.scrollTop = output.scrollHeight;
  }

  trigger.addEventListener('click', openTerminal);
  closeButton.addEventListener('click', closeTerminal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeTerminal();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeTerminal();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (passwordInput.value.trim() !== '101126') {
      errorMessage.classList.remove('hidden');
      passwordInput.select();
      return;
    }

    terminalUnlocked = true;
    errorMessage.classList.add('hidden');
    loginPhase.classList.add('hidden');
    terminalPhase.classList.remove('hidden');
    terminalInput.focus();
    printLine('Acesso autorizado.');
  });

  terminalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim();
    if (!command) return;

    terminalInput.value = '';
    printLine(`magna> ${command}`, 'text-emerald-400 font-bold');

    const parts = command.split(/\s+/);
    const verb = parts[0].toLowerCase();

    if (verb === 'clear') {
      output.replaceChildren();
      return;
    }

    if (verb === 'help') {
      printLine('Comandos: cat top-secret.txt <ano ou nome>; perfil <nome ou codinome>; list; clear.');
      return;
    }

    if (verb === 'list') {
      for (const heroi of Object.values(contasHeroisDB)) {
        printLine(`${heroi.codinome.toUpperCase()} — ${heroi.nome}`);
      }
      return;
    }

    if (verb === 'cat') {
      const arquivo = (parts[1] || '').toLowerCase();
      if (arquivo === 'top-secret.txt' || arquivo === 'top-secret') {
        printLine(buscarTopSecret(parts.slice(2).join(' ')));
      } else {
        printLine('Arquivo não encontrado. Consulte o dossiê com cat top-secret.txt <ano ou nome>.', 'text-red-400');
      }
      return;
    }

    const profileQuery = verb === 'perfil' ? parts.slice(1).join(' ') : command;
    const heroi = getHeroiPorCodinome(profileQuery);
    if (heroi) {
      printLine(`Nome civil: ${heroi.nome}\nCodinome: ${heroi.codinome}\nIdade: ${heroi.idade}\nEquipe: ${heroi.equipe}\nPoderes: ${heroi.poderes}`);
      return;
    }

    printLine('Comando ou registro não encontrado. Digite help para ver os comandos.', 'text-amber-400');
  });
});
