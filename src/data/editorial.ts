import { getGear } from './gear';
import { getLife } from './life';
import type { PostLanguage } from '../utils/posts';

export interface EditorialEntry {
  label: string;
  title: string;
  description: string;
  href: string;
}

export interface PhotoEntry extends EditorialEntry {
  credit: string;
  image: { src: string; alt: string; width: number; height: number };
}

export interface EditorialArticle extends EditorialEntry {
  slug: string;
  sections: {
    heading: string;
    text: string;
    photo?: PhotoEntry['image'] & { caption: string };
  }[];
  image?: PhotoEntry['image'];
  credit?: string;
  source: { title: string; href: string };
}

function hasPhoto<T extends EditorialArticle>(entry: T): entry is T & PhotoEntry {
  return Boolean(entry.image && entry.credit);
}

export function getEditorial(lang: PostLanguage) {
  const gear = getGear(lang);
  const life = getLife(lang);
  const gearPreview = gear.filter(hasPhoto);
  const lifePreview = life.filter(hasPhoto)
    .filter((entry): entry is typeof entry & { captured: string } => Boolean(entry.captured))
    .sort((a, b) => b.captured.localeCompare(a.captured))
    .slice(0, 5);
  return { gear, life, gearPreview, lifePreview };
}
