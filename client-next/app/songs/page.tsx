"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
const GET_SONGS = gql`
  query Songs {
    songs {
      id
      name
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
        {data.songs.map((song: any) => (
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
