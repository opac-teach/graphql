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
  const { data, loading, error, refetch  } = useQuery(GET_SONGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs.map((song) => (
          <div key={song.id} className="flex flex-col gap-2 mb-4">
            <div>
              <Link href={`/songs/${song.id}`} className="font-bold underline">
                {song.name}
              </Link>
            </div>
            <div className="text-sm">
              By:{" "}
              <Link href={`/users/${song.user.id}`} className="underline">
                {song.user.name}
              </Link>
            </div>
            <div className="text-sm">
              Genre:{" "}
              <Link href={`/genres/${song.genre.id}`} className="underline">
                {song.genre.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <CreateSongForm refetch={refetch} />
    </div>
  );
}
