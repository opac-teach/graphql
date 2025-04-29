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
            <div className="flex gap-2 items-end">
              <Link href={`/songs/${song.id}`}>{song.name}</Link>
              <p>by</p>
              <Link href={`/users/${song.user.id}`}>{song.user.name}</Link>
              {song.genre ? (
                <Link href={`/genres/${song.genre.id}`}>
                  <h3>{song.genre.name}</h3>
                </Link>
              ) : (
                <h3>Unknown</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
