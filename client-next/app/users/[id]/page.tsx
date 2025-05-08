"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Song } from "@/lib/graphql/graphql";
import { GET_USER } from "@/app/queries/user.query";

function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function User() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User</h1>
      <h3>{data?.user.name}</h3>
      <h2>Number of songs</h2>
      <div>
        <span>{ data?.user.songsCount }</span>
      </div>
      <h2>Songs</h2>
      <div>
        {data?.user.songs.map((song: Song) => ( 
          <div key={song.id} className="flex gap-2">
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
            <span>
              (Genre : <Link href={`/genres/${song.genre.id}`}>{song.genre.name}</Link>)
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={() => loginAs(data?.user.id ?? "")}>
          Login as {data?.user.name}
        </Button>
      </div>
    </div>
  );
}
