const genreColorMap: Map<string, string> = new Map();

function generateRandomHexColor(): string {
  const r = Math.floor(Math.random() * 156) + 100;
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export function getColorByGenre(genre: string): string {
  if (genreColorMap.has(genre)) {
    return genreColorMap.get(genre)!;
  }

  let color;
  do {
    color = generateRandomHexColor();
  } while ([...genreColorMap.values()].includes(color));

  genreColorMap.set(genre, color);
  return color;
}
