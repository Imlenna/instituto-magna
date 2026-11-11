import { PILARES } from './aulas-data.js';
import { getHeroiPorCodinome } from './herois-db.js';

const catalogo = document.getElementById('catalogoDisciplinas');
const voltarPainel = document.getElementById('voltarPainelAluno');

try {
  const estudante = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  if (getHeroiPorCodinome(estudante?.codinome)) {
    voltarPainel.classList.remove('hidden');
  }
} catch (error) {
  console.error('Não foi possível verificar a sessão do aluno.', error);
}

if (catalogo) {
  for (const pilar of PILARES) {
    const section = document.createElement('section');
    section.className = 'space-y-4';

    const heading = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'font-serif text-xl sm:text-2xl font-bold text-blue-950';
    title.textContent = pilar.nome;
    const summary = document.createElement('p');
    summary.className = 'text-sm text-slate-600';
    summary.textContent = pilar.descricao;
    heading.append(title, summary);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

    for (const disciplina of pilar.disciplinas) {
      const card = document.createElement('article');
      card.className = 'bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3';

      const courseTitle = document.createElement('h4');
      courseTitle.className = 'font-bold text-blue-950';
      courseTitle.textContent = disciplina.nome;
      const description = document.createElement('p');
      description.className = 'text-sm text-slate-600 leading-relaxed';
      description.textContent = disciplina.descricao;
      card.append(courseTitle, description);

      if (disciplina.professor) {
        const instructor = document.createElement('p');
        instructor.className = 'text-xs text-amber-700 font-semibold';
        instructor.textContent = `Docente: ${disciplina.professor}`;
        card.append(instructor);
      }

      grid.append(card);
    }

    section.append(heading, grid);
    catalogo.append(section);
  }
}
