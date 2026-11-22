export const booksCatalog = 'https://guisso.dev/books/';

export const primaryNavigation = [
  { href: '/blog/', text: { pt: 'Blog', en: 'Blog' }, icon: 'blog' },
  { href: '/projects/', text: { pt: 'Projetos', en: 'Projects' }, icon: 'projects' },
  { href: '/talk/', text: { pt: 'Talks', en: 'Talks' }, icon: 'talks' },
  { href: '/about/', text: { pt: 'Sobre', en: 'About' }, icon: 'about' },
] as const;

export type NavigationIcon = typeof primaryNavigation[number]['icon'] | 'more' | 'language';
