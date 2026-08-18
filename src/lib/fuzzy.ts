export type FuzzyHit<T> = {
  item: T
  score: number
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function score(query: string, target: string) {
  const q = normalize(query);
  const t = normalize(target);
  if (!q) return 1;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;

  let ti = 0;
  let streak = 0;
  let points = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    points += found === ti ? 4 : 1;
    streak = found === ti ? streak + 1 : 0;
    points += streak;
    ti = found + 1;
  }
  return points;
}

export function fuzzyFilter<T>(
  items: T[],
  query: string,
  getText: (item: T) => string[],
): FuzzyHit<T>[] {
  const q = normalize(query);
  if (!q) return items.map((item) => ({ item, score: 1 }));

  return items
    .map((item) => ({
      item,
      score: Math.max(...getText(item).map((text) => score(q, text))),
    }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score);
}
