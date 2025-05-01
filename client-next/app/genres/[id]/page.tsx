"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { gql } from "@/lib/graphql";

const GET_GENRE = gql(`
  query Genre($id: ID!) {
    genre(id: $id) {
      id
      name
      songs {
        id
        name
      }
    }
  }
`);

export default function GenreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genre: {data?.genre.name}</h1>
      <h2>Songs</h2>
      <ul>
        {data?.genre.songs.map((song) => (
          <li key={song.id}>
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
