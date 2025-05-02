"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@apollo/client";

const GET_SONGS = gql`
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
`;

export default function Songs() {
  const { data, loading, error } = useQuery(GET_SONGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs && data.songs.length > 0 ? (
          data.songs.map((song: any) => (
            <div key={song.id} className="mb-4">
              <p className="font-bold">
                <Link href={`/songs/${song.id}`} className="underline">
                  {song.name}
                </Link>
              </p>
              <div className="text-sm">
                By:{" "}
                <Link href={`/users/${song.user.id}`} className="underline">
                  {song.user.name}
                </Link>
              </div>
              <div className="text-sm">
                Genre:{" "}
                <Link href={`/genre/${song.genre.id}`} className="underline">
                  {song.genre.name}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune chanson trouvée.</p>
        )}
      </div>
    </div>
  );
}
