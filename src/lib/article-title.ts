export function splitArticleTitle(title: string) {
  const text = title.trim();
  const midpoint = text.length / 2;
  let splitAt = 0;

  // Use the word boundary closest to the middle of the title.
  for (const { index } of text.matchAll(/\s+/gu)) {
    if (splitAt === 0 || Math.abs(index - midpoint) < Math.abs(splitAt - midpoint)) {
      splitAt = index;
    }
  }

  return {
    prefix: splitAt ? text.slice(0, splitAt) : text,
    suffix: splitAt ? text.slice(splitAt).trimStart() : '',
  };
}
