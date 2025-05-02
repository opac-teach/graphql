"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_SONGS = gql(`
  query SongId($id: ID!) {
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
export default function SongsId() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONGS, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song</h1>
      <h3>nom : {data?.song.name}</h3>
      <h3>id : {data?.song.id}</h3>
      <h3>genre : {data?.song.genre.name}</h3>
      <h3>créateur : {data?.song.user.name}</h3>
    </div>
  );
}
