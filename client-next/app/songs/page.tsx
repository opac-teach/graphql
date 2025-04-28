"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";

const GET_SONGS = gql(`
  query Songs($pagination: PaginationInput!) {
    songs(pagination: $pagination) {
      id
      name
      user {
        id
        name
      }
    }
  }
`);


export default function Songs() {
    const page = 1
    const pageSize = 10
  const { data, loading, error } = useQuery(GET_SONGS, {
      variables: { pagination: { page, pageSize } }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div className="mt-10">
        {data?.songs.map((song) => (
          <div key={song.id} className="flex gap-2">
            <div>
              <Link href={`/songs/${song.id}`}>{song.name}</Link>
            </div>
              -
              <div>
                  <Link href={`/users/${song?.user?.id}`}>
                      { song?.user?.name }
                  </Link>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
