"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Loading from "@/components/Loading";
import SongCard from "@/components/song/song.card";
import { useState } from "react";

const GET_SONGS = gql(`
  query Songs($limit: Int, $offset: Int, $genreId: ID) {
  songs(limit: $limit, offset: $offset, genreId: $genreId) {
    id
    name
    user {
      id
      name
    }
    genre {
      id
      name
    }
  }
}
`);

const GET_GENRES = gql(`
  query Genres {
  genres {
    id
    name
  }
}
`);

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

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre === "" ? null : selectedGenre);
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
  defaultValue = null,
}: {
  genres: { id: string; name: string }[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string | null;
}) {
  return (
    <select
      className="border rounded-md p-2 cursor-pointer"
      onChange={onChange}
      defaultValue={defaultValue || ""}
    >
      <option value="">All Genres</option>
      {genres?.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
