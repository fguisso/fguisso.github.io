export function normalizeSearchText(text: string): string {
  return text.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

// Archive tags are editorial metadata. Keep a selected topic when its name changes language.
const tagPairs = [
  ['arquitetura', 'architecture'], ['carreira', 'career'], ['comunicacao', 'communication'],
  ['Conteúdo', 'Content'], ['Educação', 'Education'], ['engenharia', 'engineering'],
  ['ferramentas', 'tools'], ['História', 'History'], ['ia', 'AI'], ['Interatividade', 'Interactivity'],
  ['KPIs', 'KPI'], ['notas', 'notes'], ['pt-br', 'en'], ['referência', 'reference'],
  ['Reflexões', 'Reflections'], ['Segurança', 'Security'],
];

export function alternateQuery(query: string, english: boolean): string {
  if (!query.startsWith('#')) return query;
  const key = normalizeSearchText(query.slice(1));
  const pair = tagPairs.find(([pt, en]) => normalizeSearchText(english ? en : pt) === key);
  return pair ? '#' + pair[english ? 0 : 1] : query;
}
