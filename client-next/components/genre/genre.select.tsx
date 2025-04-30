import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectGenre({
  genres,
  onChange,
  defaultValue,
  withAll = false,
}: {
  genres: { id: string; name: string }[] | undefined;
  onChange: (value: string) => void;
  defaultValue?: string;
  withAll?: boolean;
}) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
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
          {genres?.map((genre) => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
