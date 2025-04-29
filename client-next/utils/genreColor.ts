const availableColors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-orange-200",
  "bg-indigo-200",
  "bg-teal-200",
  "bg-amber-200",
];

const genreColorMap: Map<string, string> = new Map();

export function getColorByGenre(genre: string): string {
  if (genreColorMap.has(genre)) {
    return genreColorMap.get(genre)!;
  }

  const usedColors = new Set(genreColorMap.values());
  const unusedColors = availableColors.filter(
    (color) => !usedColors.has(color)
  );

  // Si toutes les couleurs sont utilisées, fallback (optionnel)
  const color =
    unusedColors.length > 0
      ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
      : "bg-gray-200"; // fallback si plus de couleurs dispo

  genreColorMap.set(genre, color);
  return color;
}
