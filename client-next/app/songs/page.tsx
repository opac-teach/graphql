"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateSongForm from "./CreateSongForm";

const GET_SONGS = gql(`
  query Songs {
    songs {
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
  const { data, loading, error, refetch } = useQuery(GET_SONGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs.map((song) => (
          <div key={song.id} className="flex gap-2">
            <div className="flex gap-1">
              <Link href={`/songs/${song.id}`}>{song.name}</Link>
              <span>
                (Author : <Link href={`/users/${song.user.id}`}>{song.user.name}</Link>, 
                Genre : <Link href={`/genres/${song.genre.id}`}>{song.genre.name}</Link>)
              </span>
            </div>
          </div>
        ))}
      </div>
      <CreateSongForm refetch={refetch} />
    </div>
  );
}
