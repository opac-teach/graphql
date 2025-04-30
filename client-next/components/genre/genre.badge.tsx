import { getColorByGenre } from "@/utils/genreColor";
import { Badge } from "../ui/badge";

export default function GenreBadge({ name }: { name: string }) {
  return (
    <Badge
      style={{
        backgroundColor: getColorByGenre(name),
      }}
    >
      {name}
    </Badge>
  );
}
