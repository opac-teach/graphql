"use client";

import Loading from "@/components/Loading";
import { gql } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GET_SONG = gql(`
  query Song($id: ID!) {
  song(id: $id) {
    name
  }
}
`);

export default function SongPage() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Song</h2>
      <p>{data?.song.name}</p>
    </div>
  );
}
