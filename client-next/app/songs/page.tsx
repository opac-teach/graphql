"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateSongForm from "@/app/songs/CreateSongForm";


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
<div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold mb-6">Songs</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data?.songs.map((song) => (
      <div
        key={song.id}
        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <div className="mb-2">
          <Link
            href={`/songs/${song.id}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {song.name}
          </Link>
        </div>
        <div className="text-sm text-gray-600">
          <Link
            href={`/users/${song.user.id}`}
            className="hover:underline"
          >
            User : {song.user.name}
          </Link>
        </div>
        <div>
          <p>Genre : {song.genre?.name ?? "Unknown"}</p>
        </div>
      </div>
    ))}
  </div>
  <CreateSongForm refetch={refetch}/>
</div>
  );
}
