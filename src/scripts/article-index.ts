export function mountArticleIndex(
  track: HTMLElement,
  index: HTMLDetailsElement,
  { mobile, reducedMotion, onDockChange, requestUpdate }: {
    mobile: MediaQueryList;
    reducedMotion: MediaQueryList;
    onDockChange: () => void;
    requestUpdate: () => void;
  },
) {
  const origin = index.closest<HTMLElement>('[data-article-index]');
  const summary = index.querySelector<HTMLElement>('summary');
  const panel = index.querySelector<HTMLElement>('nav');
  const launcher = track.querySelector<HTMLElement>('[data-nav-launch]');
  const more = track.querySelector<HTMLDetailsElement>('[data-nav-more]');
  const moreSummary = more?.querySelector('summary');
  const morePanel = more?.querySelector<HTMLElement>('.nav-panel');
  if (!origin || !summary || !panel || !launcher || !more || !moreSummary || !morePanel) return;

  const primary = [...track.querySelectorAll<HTMLAnchorElement>('[data-nav-primary]')];
  const sections = [...panel.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')].flatMap(link => {
    const heading = document.getElementById(link.getAttribute('href')?.slice(1) ?? '');
    return heading ? [{ link, heading }] : [];
  });
  let placement: 'inline' | 'desktop' | 'mobile' = 'inline';
  let current: HTMLAnchorElement | undefined;
  let atPageEnd = false;
  let pressedPointer: number | undefined;
  let indexMotion: Animation | undefined;
  let shortcutMotions: Animation[] = [];
  let shortcutsReady = false;
  let shortcutTimer: number | undefined;

  const stopShortcutMotion = () => {
    if (!shortcutMotions.length) return;
    window.clearTimeout(shortcutTimer);
    for (const animation of shortcutMotions) animation.cancel();
    shortcutMotions = [];
    shortcutsReady = false;
    track.removeAttribute('data-index-docking');
  };

  const startShortcutMotion = () => {
    const moreRect = moreSummary.getBoundingClientRect();
    const target = moreRect.left + moreRect.width / 2;
    const duration = 180;
    const stagger = 18;
    track.setAttribute('data-index-docking', '');
    const animations = primary.map((link, index) => {
      const rect = link.getBoundingClientRect();
      const offset = target - (rect.left + rect.width / 2);
      return link.animate([
        { transform: 'none', opacity: 1 },
        { transform: `translateX(${offset * .78}px) scale(.85)`, opacity: .65, offset: .65 },
        { transform: `translateX(${offset}px) scale(.65)`, opacity: 0 },
      ], { duration, delay: index * stagger, easing: 'ease-in-out', fill: 'forwards' });
    });
    shortcutMotions = animations;
    const complete = () => {
      if (shortcutMotions !== animations || shortcutsReady) return;
      window.clearTimeout(shortcutTimer);
      shortcutsReady = true;
      requestUpdate();
    };
    animations.at(-1)?.addEventListener('finish', complete, { once: true });
    shortcutTimer = window.setTimeout(complete, duration + (animations.length - 1) * stagger + 34);
  };

  const move = (
    parent: HTMLElement & { moveBefore?: (child: Node, before: Node | null) => void },
    child: HTMLElement,
    before: HTMLElement | null = null,
  ) => {
    if (parent.moveBefore) parent.moveBefore(child, before);
    else parent.insertBefore(child, before);
  };

  const moveIndex = (next: typeof placement, animate: boolean) => {
    if (next === placement) return;
    const previous = placement;
    const focused = document.activeElement;
    const primaryFocused = primary.some(link => link === focused);
    const restoreFocus = focused instanceof HTMLElement && (index.contains(focused) || primaryFocused);
    const panelScroll = index.open ? panel.scrollTop : 0;
    const before = animate && !reducedMotion.matches && !index.open
      ? summary.getBoundingClientRect()
      : undefined;

    indexMotion?.cancel();
    indexMotion = undefined;
    if (next === 'inline') index.removeAttribute('data-article-toc-docked');
    else index.setAttribute('data-article-toc-docked', next);
    summary.toggleAttribute('data-nav-item', next === 'desktop');

    if (next === 'desktop') {
      if (primaryFocused) more.open = true;
      const firstItem = morePanel.firstElementChild as HTMLElement | null;
      for (const link of primary) {
        link.removeAttribute('data-nav-item');
        morePanel.insertBefore(link, firstItem);
      }
      move(track, index, more);
    } else {
      if (next === 'mobile') move(track, index, launcher);
      else move(origin, index);
      if (placement === 'desktop') {
        for (const link of primary) {
          link.setAttribute('data-nav-item', '');
          track.insertBefore(link, more);
        }
      }
    }

    placement = next;
    if (restoreFocus && document.activeElement !== focused) focused.focus({ preventScroll: true });
    if (panelScroll) panel.scrollTop = panelScroll;
    onDockChange();

    if (!before?.width || !before.height) return;
    const after = summary.getBoundingClientRect();
    if (!after.width || !after.height) return;
    const x = before.left + before.width / 2 - (after.left + after.width / 2);
    const offsetY = before.top - after.top;
    const y = next === 'desktop' ? Math.max(offsetY, 20) : offsetY;
    const limit = next === 'mobile' || previous === 'mobile' ? 32 : 80;
    const travel = Math.min(1, limit / Math.max(1, Math.hypot(x, y)));
    indexMotion = summary.animate([
      { translate: `${x * travel}px ${y * travel}px`, opacity: .82 },
      { translate: 'none', opacity: 1 },
    ], { duration: 280, easing: 'cubic-bezier(.22,.72,.3,1)' });
  };

  const updateCurrent = (reveal = false) => {
    if (!index.open) return;
    const navbarBottom = mobile.matches ? 0 : track.getBoundingClientRect().bottom;
    const readingTop = Math.min(window.innerHeight * 0.4, navbarBottom + 80);
    let next: HTMLAnchorElement | undefined;
    for (const { link, heading } of sections) {
      if (heading.getBoundingClientRect().top > readingTop) break;
      next = link;
    }
    if (atPageEnd) next = sections.at(-1)?.link;

    if (next !== current) {
      current?.removeAttribute('aria-current');
      next?.setAttribute('aria-current', 'location');
      current = next;
    }
    if (reveal && current) {
      const linkRect = current.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      if (linkRect.top < panelRect.top) panel.scrollTop += linkRect.top - panelRect.top - 8;
      if (linkRect.bottom > panelRect.bottom) panel.scrollTop += linkRect.bottom - panelRect.bottom + 8;
    }
  };

  index.addEventListener('pointerdown', event => {
    if (event.isPrimary) pressedPointer = event.pointerId;
  });

  const releasePointer = (event: PointerEvent) => {
    if (pressedPointer !== event.pointerId) return;
    pressedPointer = undefined;
    requestUpdate();
  };
  window.addEventListener('pointerup', releasePointer, true);
  window.addEventListener('pointercancel', releasePointer, true);
  window.addEventListener('blur', () => {
    if (pressedPointer === undefined) return;
    pressedPointer = undefined;
    requestUpdate();
  });

  index.addEventListener('click', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    const section = sections.find(section => section.link === link);
    if (!section) return;

    index.open = false;
    if (!section.heading.hasAttribute('tabindex')) section.heading.tabIndex = -1;
    section.heading.focus({ preventScroll: true });
  });

  index.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !index.open) return;
    event.preventDefault();
    event.stopPropagation();
    index.open = false;
    summary.focus({ preventScroll: true });
  });

  index.addEventListener('toggle', () => updateCurrent(true));
  reducedMotion.addEventListener('change', () => {
    indexMotion?.cancel();
    stopShortcutMotion();
    requestUpdate();
  });

  return (atEnd: boolean, animate: boolean) => {
    atPageEnd = atEnd;
    if (pressedPointer === undefined) {
      const position = origin.getBoundingClientRect();
      const next = mobile.matches
        ? (position.bottom <= 0 ? 'mobile' : 'inline')
        : (position.top <= track.getBoundingClientRect().bottom + 6 ? 'desktop' : 'inline');
      const stageShortcuts = next === 'desktop' && placement === 'inline' && animate && !reducedMotion.matches &&
        !index.open && !more.open && primary.length > 0 && !primary.some(link => link === document.activeElement);
      if (stageShortcuts && !shortcutsReady) {
        if (!shortcutMotions.length) startShortcutMotion();
      } else {
        moveIndex(next, animate);
        stopShortcutMotion();
      }
    }
    updateCurrent();
  };
}
