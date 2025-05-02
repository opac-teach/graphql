"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateSongForm from "./CreateSongForm"

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
        <CreateSongForm refetch={refetch}/> 
        <div>
          {data?.songs.map((song) => (
            <div key={song.id} className="flex flex-col gap-1 mb-4">
              <Link href={`/songs/${song.id}`} className="text-blue-600 underline">
                {song.name}
              </Link>
              <p className="text-sm">
                Créée par :{" "}
                <Link href={`/users/${song.user.id}`} className="text-blue-600 underline">
                  {song.user.name}
                </Link>
              </p>
              <p className="text-sm">
                Genre :{" "}
                <Link href={`/genres/${song.genre.id}`} className="text-purple-600 underline">
                  {song.genre.name}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
}
