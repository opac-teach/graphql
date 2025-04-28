"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_USER = gql(`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      songs {
        id
        name
        genre {
          id
          name
        }
      }
    }
  }
`);

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
  <h2>Songs</h2>
  <div>
    {data?.user.songs.map((song) => (
        <div key={song.id} className="flex gap-2">
          <div>
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
          </div>
          -
          <div>
            <Link href={`/genres/${song.genre.id}`}>{song.genre.name}</Link>
          </div>
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
