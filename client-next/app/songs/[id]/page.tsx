"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_SONG = gql(`
    query Song($songId: ID!) {
        song(id: $songId) {
            id
            name
            user {
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
      songId: id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data)
  return (
    <div>
      <h1>SONG</h1>
      <h3>{data?.song.name}</h3>
      <p>{data?.song.user.name}</p>
    </div>
  );
}
