"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateSongForm from "./CreateSongForm";
import { Song } from "@/lib/graphql/graphql";
import { GET_SONGS } from "../queries/song.query";

export default function Songs() {
  const { data, loading, error } = useQuery(GET_SONGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs.map((song: Song) => (
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
      <CreateSongForm />
    </div>
  );
}
