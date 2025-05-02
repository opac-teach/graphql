"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_SONG = gql(`
  query Song($id: ID!) {
    song(id: $id) {
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

export default function Song() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song</h1>
        <h3>nom du son : {data?.song.name}</h3>
        <h3>Id du son : {data?.song.id}</h3>
        <Link href={`/users/${data?.song.user.id}`}>par {data?.song.user.name}</Link>
        <br />
        <Link href={`/genres/${data?.song.genre.id}`}>{data?.song.genre.name}</Link>
    </div>
  );
}
