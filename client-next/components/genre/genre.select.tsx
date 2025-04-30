import { useQuery } from "@apollo/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GET_GENRES } from "@/requetes/queries";
import Loading from "../Loading";

export default function SelectGenre({
  onChange,
  defaultValue,
  withAll = false,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
  withAll?: boolean;
}) {
  const { data, loading } = useQuery(GET_GENRES);

  if (loading) return <Loading />;

  const hasOneGenre = data?.genres.length === 1;

  if (hasOneGenre) {
    defaultValue = data.genres[0].id;
    onChange(data.genres[0].id);
  }

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={hasOneGenre}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genres</SelectLabel>
          {withAll && (
            <SelectItem value="all" className="text-gray-500">
              All Genres
            </SelectItem>
          )}
          {data?.genres?.map((genre) => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
