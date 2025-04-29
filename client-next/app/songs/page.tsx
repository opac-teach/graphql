"use client";

import { useQuery } from "@apollo/client";
import Loading from "@/components/Loading";
import SongCard from "@/components/song/song.card";
import { useState } from "react";
import { GET_GENRES, GET_SONGS } from "@/requetes/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Songs() {
  const [genre, setGenre] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_SONGS, {
    variables: {
      limit: 10,
      offset: 0,
      genreId: genre,
    },
  });

  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useQuery(GET_GENRES);

  const handleGenreChange = (value: string) => {
    setGenre(value === "all" ? null : value);
  };

  if (loading || genresLoading) return <Loading />;
  if (error || genresError)
    return <div>Error: {error?.message || genresError?.message}</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Songs</h2>
        <SelectGenre
          genres={genresData?.genres}
          onChange={handleGenreChange}
          defaultValue={genre}
        />
      </div>

      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {data?.songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

function SelectGenre({
  genres,
  onChange,
  defaultValue,
}: {
  genres: { id: string; name: string }[] | undefined;
  onChange: (value: string) => void;
  defaultValue?: string | null;
}) {
  return (
    <Select defaultValue={defaultValue || "all"} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genres</SelectLabel>
          <SelectItem value="all">All Genres</SelectItem>
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
