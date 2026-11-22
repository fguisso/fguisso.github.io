export const booksCatalog = 'https://guisso.dev/books/';

export const primaryNavigation = [
  { href: '/blog/', text: 'Blog', icon: 'blog' },
  { href: '/projects/', text: 'Projetos', icon: 'projects' },
  { href: '/gear/', text: 'Uses', icon: 'gear' },
  { href: '/life/', text: 'Life', icon: 'life' },
] as const;

export type NavigationIcon = typeof primaryNavigation[number]['icon'] | 'more' | 'language';
