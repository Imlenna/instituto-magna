const SENHA_PADRAO = 'juras';

export const contasHeroisDB = {
  cendre: {
    nome: 'Maxime Rousseau',
    codinome: 'cendre',
    senha: SENHA_PADRAO,
    idade: '22',
    equipe: 'Juraveis',
    poderes: 'Transferir energia cinética para qualquer coisa que possua minerais, energizando-a e, na maior parte das vezes, explodindo-a.',
    frase: 'Estão você gosta de energia? Acha que não tem limites? Pois eu tenho o seu limite bem aqui.',
  },
  dokkaebi: {
    nome: 'Sunwoo Han',
    codinome: 'dokkaebi',
    senha: SENHA_PADRAO,
    idade: '22',
    equipe: 'Juraveis',
    poderes: 'Telepatia, magias e telecinese.',
    frase: 'No céu acima e na terra a baixo eu sou a mais honrada',
  },
  meteora: {
    nome: 'Aurora Estrela Souza',
    codinome: 'meteora',
    senha: SENHA_PADRAO,
    idade: '21',
    equipe: 'Juraveis',
    poderes: 'Força sobre-humana, resistência aprimorada, comunicação com animais e supervelocidade.',
    frase: 'Nada é pequeno demais para merecer cuidado.',
  },
  kryos: {
    nome: 'Kyle Albuquerque Gardner',
    codinome: 'kryos',
    senha: SENHA_PADRAO,
    idade: '21',
    equipe: 'Juraveis',
    poderes: 'Manipulação elemental de gelo e fogo, raio energético e velocidade sobre-humana.',
    frase: 'Fica frio aí!',
  },
  vortex: {
    nome: 'Mariana Rodrigues Senilloza',
    codinome: 'vortex',
    senha: SENHA_PADRAO,
    idade: '25',
    equipe: 'Juraveis',
    poderes: 'Absorção de energia.',
    frase: 'Nem foi nada demais, é só resolver!',
  },
  foldlocus: {
    nome: 'Zan Hollins',
    codinome: 'fold locus',
    senha: SENHA_PADRAO,
    idade: '26',
    equipe: 'Juraveis',
    poderes: 'Conhecimento tecnológico e teletransporte.',
    frase: '',
  },
  molhado: {
    nome: 'Marcelo Marin',
    codinome: 'molhado',
    senha: SENHA_PADRAO,
    idade: '24',
    equipe: 'Juraveis',
    poderes: 'Hidrocinese e comunicação com animais.',
    frase: 'Nade a favor da correnteza… até que tenha que ir contra ela.',
  },
  solaria: {
    nome: 'Naa’Lumyra',
    codinome: 'solaria',
    senha: SENHA_PADRAO,
    idade: '18 anos miltonianos',
    equipe: 'Juraveis',
    poderes: 'Voo, superforça, disparo energético, raio elemental e visão de raio-X.',
    frase: 'É pau neles',
  },
  paradox: {
    nome: 'Han Ji-Hyun Makris',
    codinome: 'paradox',
    senha: SENHA_PADRAO,
    idade: '18',
    equipe: 'Juraveis',
    poderes: 'Magia, telepatia, telecinese, manipulação da realidade, voo e intangibilidade.',
    frase: 'Sua existência é só uma nota temporária na frequência do tempo. E eu acabei de abafar o som',
  },
  phaser: {
    nome: 'Josh Zirco Allen',
    codinome: 'phaser',
    senha: SENHA_PADRAO,
    idade: '19',
    equipe: 'Juraveis',
    poderes: 'Supervelocidade e força de aceleração.',
    frase: '',
  },
  ysha: {
    nome: 'ﯾِﯾﺷﺎ أﻣﯾرة اﻟطﱠﯾّﺎر',
    codinome: 'ysha',
    senha: SENHA_PADRAO,
    idade: '21',
    equipe: 'Juraveis',
    poderes: 'Teleporte.',
    frase: 'foda-se',
  },
  husk: {
    nome: 'Juniper Lee',
    codinome: 'husk',
    senha: SENHA_PADRAO,
    idade: '21',
    equipe: 'Juraveis',
    poderes: 'Ver auras e raciocínio racional.',
    frase: 'Não subestime um sorriso, viu? Ele já segurou minha alma em pé mais vezes que minha armadura',
  },
};

function normalizar(valor) {
  return String(valor ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function getHeroiPorCodinome(query) {
  const termo = normalizar(query);
  if (!termo) return null;

  return Object.values(contasHeroisDB).find((heroi) => (
    normalizar(heroi.codinome) === termo
    || normalizar(heroi.nome) === termo
    || normalizar(heroi.codinome).includes(termo)
    || normalizar(heroi.nome).includes(termo)
  )) || null;
}

if (typeof window !== 'undefined') {
  window.contasHeroisDB = contasHeroisDB;
  window.getHeroiPorCodinome = getHeroiPorCodinome;
}
