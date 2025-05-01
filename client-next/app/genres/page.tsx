"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateGenreForm from "./CreateGenreForm";

const GET_GENRES = gql(`
  query Genres {
    genres {
      id
      name
      songsCount
    }
  }
`);

export default function GenresPage() {
  const { data, loading, error, refetch  } = useQuery(GET_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {data?.genres.map((genre) => (
          <li key={genre.id}>
            <Link href={`/genres/${genre.id}`}>{genre.name}</Link> - {genre.songsCount} songs
          </li>
        ))}
      </ul>
      <CreateGenreForm refetch={refetch} />
    </div>
  );
}
