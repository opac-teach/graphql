"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_GENRE = gql(`
    query Genre($genreId: ID!) {
        genre(id: $genreId) {
            id
            name
            songs {
                id
                name
            }
        }
    }
`);


export default function Genre() {
  const { id } = useParams<{ id: string }>();


  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      genreId: id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>SONG</h1>
      <h3>{data?.genre.name}</h3>
      <div>
        {data?.genre.songs.map((song) => (
          <div key={song.id} className="flex gap-2">
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
