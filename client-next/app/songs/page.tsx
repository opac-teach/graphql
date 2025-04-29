"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Song } from "@/lib/graphql/graphql";

const GET_SONGS = gql(`
  query Songs($limit: Int!, $page: Int!) {
    songs(limit: $limit, page: $page) {
      id
      name
    }
  }
`);

export default function Songs() {
  const { data, loading, error } = useQuery(GET_SONGS, {
    variables: {
      limit: 10,
      page: 1,
    },
  });

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs.map((song: Song) => (
          <div key={song.id} className="flex gap-2">
            <div>
              <Link href={`/songs/${song.id}`}>{song.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
