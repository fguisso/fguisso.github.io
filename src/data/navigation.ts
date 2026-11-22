export const booksCatalog = 'https://guisso.dev/books/';

export const primaryNavigation = [
  { href: '/blog/', text: 'Blog', icon: 'blog' },
  { href: '/projects/', text: 'Projetos', icon: 'projects' },
] as const;

export type NavigationIcon = typeof primaryNavigation[number]['icon'] | 'more' | 'language';
