"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
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

function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function Song() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (!data?.genre) return <div>Genre not found</div>;
  if (!data?.genre.songs) return <div>Songs not found</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genre</h1>
      <h3>{data?.genre.name}</h3>
      <h2>Songs</h2>
      <div>
        {data?.genre.songs.map((genre) => (
          <div key={genre.id} className="flex gap-2">
            <Link href={`/songs/${genre.id}`}>{genre.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
