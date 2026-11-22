import { alternateQuery, normalizeSearchText } from '../utils/search-text';
import { mountArticleIndex } from './article-index';

const themes = ['escuro', 'claro', 'areia'] as const;
const englishThemeNames = { escuro: 'dark', claro: 'light', areia: 'sand' };
const root = document.documentElement;
const english = root.lang === 'en';
const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
const themeName = (theme: typeof themes[number]) => english ? englishThemeNames[theme] : theme;
const nextTheme = (theme: typeof themes[number]) => themes[(themes.indexOf(theme) + 1) % themes.length];
let theme = themes.find(value => value === root.dataset.tema) ?? 'escuro';

function syncThemeButtons() {
  const label = `${english ? 'Theme' : 'Tema'}: ${themeName(theme)}`;
  const next = themeName(nextTheme(theme));
  const action = english ? `Switch to ${next} theme` : `Mudar para o tema ${next}`;
  themeButtons.forEach(button => {
    button.textContent = label;
    button.setAttribute('aria-label', `${label}. ${action}`);
    button.hidden = false;
  });
}

themeButtons.forEach(button => button.addEventListener('click', () => {
  theme = nextTheme(theme);
  root.dataset.tema = theme;
  try { localStorage.setItem('guisso-theme', theme); } catch {}
  syncThemeButtons();
}));
syncThemeButtons();

const track = document.querySelector<HTMLElement>('[data-nav-track]');
const pill = track?.querySelector<HTMLElement>('[data-nav-pill]');

if (track && pill) {
  const disclosures = [...track.querySelectorAll<HTMLDetailsElement>('[data-nav-disclosure]')];
  const articleIndex = document.querySelector<HTMLDetailsElement>('[data-article-toc]');
  if (articleIndex) disclosures.push(articleIndex);
  const progress = track.querySelector<HTMLElement>('[data-nav-progress]');
  const mobile = matchMedia('(max-width: 760px), (pointer: coarse), (max-width: 1024px) and (max-height: 540px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const launcher = track.querySelector<HTMLButtonElement>('[data-nav-launch]')!;
  const closeMenu = track.querySelector<HTMLButtonElement>('[data-nav-close]')!;
  const homeLink = track.querySelector<HTMLAnchorElement>('.nav-brand')!;

  let hovered: HTMLElement | null = null;
  let focused: HTMLElement | null = null;
  let revealed: HTMLAnchorElement | null = null;
  let navigationTimer: number | undefined;

  const navItem = (target: EventTarget | null) => target instanceof Element
    ? target.closest<HTMLElement>('[data-nav-item]') : null;

  const clearReveal = () => {
    revealed?.removeAttribute('data-revealed');
    revealed = null;
  };

  const movePill = (item: HTMLElement | null) => {
    if (!item?.getClientRects().length || articleIndex?.contains(item)) {
      pill.removeAttribute('data-visible');
      return;
    }
    const itemRect = item.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const x = itemRect.left - trackRect.left - track.clientLeft;
    const y = itemRect.top - trackRect.top - track.clientTop;
    pill.style.width = itemRect.width + 'px';
    pill.style.height = itemRect.height + 'px';
    pill.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    pill.setAttribute('data-visible', '');
  };

  const updatePill = () => {
    const current = track.querySelector<HTMLElement>('details[open] > [data-nav-item]')
      ?? track.querySelector<HTMLElement>('[data-nav-item][aria-current="page"], [data-nav-item].nav-active');
    movePill(hovered ?? revealed ?? focused ?? current);
  };

  const setMobileMenu = (open: boolean, moveFocus = false, preserveIndex = false) => {
    const activeElement = document.activeElement;
    const wasInside = track.contains(activeElement);
    window.clearTimeout(navigationTimer);
    for (const disclosure of disclosures) {
      if (!preserveIndex || disclosure !== articleIndex) disclosure.open = false;
    }
    clearReveal();
    hovered = focused = null;
    if (mobile.matches) track.dataset.mobileMenu = open ? 'open' : 'closed';
    else delete track.dataset.mobileMenu;
    launcher.setAttribute('aria-expanded', String(mobile.matches && open));
    if ((moveFocus || wasInside) && !(preserveIndex && articleIndex?.contains(activeElement))) {
      const destination = mobile.matches && !open ? launcher : homeLink;
      destination.focus({ preventScroll: true });
    }
    updatePill();
  };

  launcher.addEventListener('click', () => setMobileMenu(true, true));
  closeMenu.addEventListener('click', () => setMobileMenu(false, true));
  mobile.addEventListener('change', () => setMobileMenu(false, false, true));

  track.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch') return;
    const item = navItem(event.target);
    if (item === hovered) return;
    hovered = item;
    updatePill();
  });
  track.addEventListener('pointerleave', () => {
    hovered = null;
    updatePill();
  });
  track.addEventListener('focusin', (event) => {
    focused = navItem(event.target);
    updatePill();
  });
  track.addEventListener('focusout', (event) => {
    focused = event.relatedTarget instanceof Node && track.contains(event.relatedTarget)
      ? navItem(event.relatedTarget) : null;
    updatePill();
  });

  for (const disclosure of disclosures) {
    disclosure.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && !disclosure.contains(event.relatedTarget)) {
        disclosure.open = false;
      }
    });
  }

  track.addEventListener('click', (event) => {
    const item = navItem(event.target);
    if (!(item instanceof HTMLAnchorElement) || event.defaultPrevented ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    window.clearTimeout(navigationTimer);

    const pointerActivation = event.detail > 0 || (event instanceof PointerEvent && event.pointerType !== '');
    if (mobile.matches && pointerActivation && revealed !== item) {
      event.preventDefault();
      hovered = null;
      clearReveal();
      revealed = item;
      item.setAttribute('data-revealed', '');
      return;
    }

    clearReveal();
    if (item.href === location.href || reducedMotion.matches) return;
    const offset = Math.abs(item.getBoundingClientRect().left - pill.getBoundingClientRect().left);
    if (offset < 1) return;

    event.preventDefault();
    movePill(item);
    navigationTimer = window.setTimeout(() => location.assign(item.href), 240);
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) return;
    for (const disclosure of disclosures) {
      if (!disclosure.contains(event.target)) disclosure.open = false;
    }
    if (revealed && !revealed.contains(event.target)) clearReveal();
  });
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = disclosures.find(disclosure => disclosure.open);
    if (!open && !revealed) {
      if (track.dataset.mobileMenu === 'open') {
        event.stopPropagation();
        setMobileMenu(false, true);
      }
      return;
    }
    event.stopPropagation();
    clearReveal();
    if (open) {
      open.open = false;
      open.querySelector('summary')?.focus();
    }
  });

  const resize = new ResizeObserver(updatePill);
  resize.observe(track);
  for (const item of track.querySelectorAll('[data-nav-item]')) resize.observe(item);
  new MutationObserver(updatePill).observe(track, {
    attributes: true, subtree: true, attributeFilter: ['data-revealed', 'open'],
  });
  setMobileMenu(false);
  // Lay out the initial active item before enabling transitions between items.
  pill.getBoundingClientRect();
  track.setAttribute('data-nav-ready', '');
  const scroller = document.scrollingElement ?? root;
  let scrollFrame = 0;
  let lastProgress = -1;
  let initialScroll = true;
  const scheduleScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScroll);
  };
  const updateIndex = articleIndex ? mountArticleIndex(track, articleIndex, {
    mobile,
    reducedMotion,
    requestUpdate: scheduleScroll,
    onDockChange: () => {
      hovered = null;
      focused = navItem(document.activeElement);
      updatePill();
    },
  }) : undefined;

  function syncScroll() {
    scrollFrame = 0;
    const top = scroller.scrollTop;
    const range = scroller.scrollHeight - scroller.clientHeight;
    const value = range > 0 ? Math.min(1, Math.max(0, top / range)) : 0;
    updateIndex?.(top > 0 && top >= range - 2, !initialScroll);
    if (progress && value !== lastProgress) {
      progress.style.setProperty('--page-progress', String(value));
      lastProgress = value;
    }
    initialScroll = false;
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  window.addEventListener('pageshow', () => {
    initialScroll = true;
    scheduleScroll();
  });
  mobile.addEventListener('change', scheduleScroll);
  new ResizeObserver(scheduleScroll).observe(document.body);
  scheduleScroll();
}
for (const list of document.querySelectorAll<HTMLElement>('[data-post-list], [data-topic-list]')) {
 const isTopicList = list.hasAttribute('data-topic-list');
 const form = list.querySelector<HTMLFormElement>('[data-list-search]');
 const input = form?.querySelector<HTMLInputElement>('input');
 if (!form || !input) continue;

 const rows = [...list.querySelectorAll<HTMLElement>('[data-post], [data-topic]')].map(row => ({
   row,
   text: normalizeSearchText(row.dataset.search ?? ''),
   tags: (JSON.parse(row.dataset.postTags ?? '[]') as string[]).map(normalizeSearchText),
 }));
 const status = list.querySelector('[data-search-status]');
 const empty = list.querySelector<HTMLElement>('[data-search-empty]');
 const clear = form.querySelector<HTMLButtonElement>('[data-search-clear]');
 const { singular, plural } = form.dataset;
 const languageLink = document.querySelector<HTMLAnchorElement>('[data-language-link]');
 const alternateUrl = languageLink ? new URL(languageLink.href) : undefined;
 const search = () => {
   const term = input.value.trim();
   if (languageLink && alternateUrl) {
     if (term) alternateUrl.searchParams.set('q', alternateQuery(term, english));
     else alternateUrl.searchParams.delete('q');
     languageLink.href = alternateUrl.href;
   }
   const query = normalizeSearchText(term);
   const tag = query.startsWith('#') ? query.slice(1).trim() : null;
   // Preserve links published before the ChatGPT tag spelling was corrected.
   const tagKey = tag === 'chagpt' ? 'chatgpt' : tag;
   let count = 0;
   for (const { row, text, tags } of rows) {
     const match = isTopicList || tagKey === null ? text.includes(tagKey ?? query) : tags.includes(tagKey);
     row.hidden = !match;
     if (match) count++;
   }
   if (status) status.textContent = `${count} ${count === 1 ? singular : plural}`;
   if (empty) empty.hidden = count !== 0;
   if (clear) clear.hidden = input.value.length === 0;
 };

 const readQuery = () => {
   const params = new URLSearchParams(location.search);
   const tag = isTopicList ? null : params.get('tag');
   input.value = params.get('q') ?? (tag ? '#' + tag : '');
   search();
 };
 const writeQuery = () => {
   const url = new URL(location.href);
   const term = input.value.trim();
   if (!isTopicList) url.searchParams.delete('tag');
   if (term) url.searchParams.set('q', term);
   else url.searchParams.delete('q');
   if (url.href !== location.href) history.replaceState(history.state, '', url);
   search();
 };

 const clearSearch = () => {
   input.value = '';
   input.focus();
   writeQuery();
 };

 form.hidden = false;
 form.addEventListener('submit', (event) => {
   event.preventDefault();
   writeQuery();
 });
 input.addEventListener('input', writeQuery);
 input.addEventListener('keydown', (event) => {
   if (event.key !== 'Escape' || event.isComposing || !input.value) return;
   event.preventDefault();
   clearSearch();
 });
 clear?.addEventListener('click', clearSearch);
 window.addEventListener('popstate', readQuery);
 readQuery();
}
for (const region of document.querySelectorAll<HTMLElement>('.article-table-scroll, .bd-row')) {
 const label = region.getAttribute('aria-label');
 if (!label) continue;

 region.addEventListener('keydown', event => {
   if (event.target !== region || region.tabIndex !== 0 || event.defaultPrevented ||
       event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
   if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
   event.preventDefault();
   region.scrollLeft += event.key === 'ArrowLeft' ? -40 : 40;
 });

 const resize = new ResizeObserver(() => {
   if (region.scrollWidth > region.clientWidth) {
     region.tabIndex = 0;
     region.setAttribute('role', 'region');
     region.setAttribute('aria-label', label);
   } else {
     region.tabIndex = -1;
     region.removeAttribute('role');
     region.removeAttribute('aria-label');
   }
 });
 resize.observe(region);
 for (const child of region.children) resize.observe(child);
}
