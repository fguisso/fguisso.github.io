import type { PostLanguage } from './posts';
import { withBase, withoutBase } from './paths';

/** Map a root-relative site route to its counterpart. Static assets keep their own URLs. */
export function localizedPath(path: string, lang: PostLanguage): string {
  const base = withoutBase(path).replace(/^\/en(?=\/|$)/, '') || '/';
  return withBase(lang === 'en' ? '/en' + base : base);
}
