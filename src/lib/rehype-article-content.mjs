const segmenter = new Intl.Segmenter();
const emojiPattern = /\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F|\u20E3/u;
const untouched = new Set(['code', 'pre', 'script', 'style', 'textarea', 'svg']);
const tianjiScreenshots = new Map([
  ['tianji-2025-anual-dashb.png', [3840, 1940]],
  ['tianji-2025-anual-paths.png', [2547, 1862]],
  ['tianji-anual-2025-geo.png', [2514, 1809]],
  ['tianji-30-dias-2025.png', [2724, 1931]],
]);

export function isArticleEmoji(text) {
  return emojiPattern.test(text);
}

function decorateText(node) {
  if (!isArticleEmoji(node.value)) return [node];

  const parts = [];
  let start = 0;
  for (const { segment, index } of segmenter.segment(node.value)) {
    if (!isArticleEmoji(segment)) continue;
    if (index > start) parts.push({ type: 'text', value: node.value.slice(start, index) });
    parts.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['article-emoji'] },
      children: [{ type: 'text', value: segment }],
    });
    start = index + segment.length;
  }
  if (start < node.value.length) parts.push({ type: 'text', value: node.value.slice(start) });
  return parts;
}

function columnCount(table) {
  const head = table.children.find(child => child.tagName === 'thead');
  const row = head?.children.find(child => child.tagName === 'tr');
  return row?.children.filter(child => child.tagName === 'th').length ?? 0;
}

export default function rehypeArticleContent() {
  return (tree, file) => {
    const frontmatter = file.data.astro?.frontmatter;
    if (frontmatter?.customTemplate === 'interactive') return;
    const tableLabel = frontmatter?.lang === 'en' ? 'Table' : 'Tabela';
    let tableNumber = 0;
    let hasTianjiScreenshot = false;

    function walk(node) {
      if (!node.children || untouched.has(node.tagName) || untouched.has(node.name)) return;
      node.children = node.children.flatMap(child => {
        if (child.type === 'text') return decorateText(child);
        walk(child);

        // The layout already renders the article title as its only h1.
        if (frontmatter?.canonicalSlug && child.tagName === 'h1') child.tagName = 'h2';

        if (child.tagName === 'img') {
          const size = tianjiScreenshots.get(String(child.properties.src).split('/').at(-1));
          if (size) {
            [child.properties.width, child.properties.height] = size;
            if (hasTianjiScreenshot) {
              child.properties.loading = 'lazy';
              child.properties.decoding = 'async';
            }
            hasTianjiScreenshot = true;
          }
        }

        if (child.type !== 'element' || child.tagName !== 'table') return [child];

        const className = ['article-table-scroll'];
        if (columnCount(child) >= 4) className.push('article-table-scroll--wide');
        return [{
          type: 'element',
          tagName: 'div',
          properties: { className, tabIndex: 0, role: 'region', ariaLabel: tableLabel + ' ' + ++tableNumber },
          children: [child],
        }];
      });
    }

    walk(tree);
  };
}
