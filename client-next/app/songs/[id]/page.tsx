"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_SONG = gql(`
  query Song($id: ID!) {
    song(id: $id) {
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

function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function Song(){
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song</h1>
      <h3>{data?.song.name}</h3>
      <div>
        <Link href={`/genres/${data?.song.genre?.id}`}>
          Genre : {data?.song.genre?.name ?? "Unknown"}
        </Link>
      </div>
      <div key={data?.song.user.id} className="flex gap-2">
        <Link href={`/users/${data?.song.user.id}`}>
          User : {data?.song.user.name}
        </Link>
      </div>

      <div className="mt-4">
        <Button onClick={() => loginAs(data?.song.user.id ?? "")}>
          Login as {data?.song.user.name}
        </Button>
      </div>
    </div>
  );
}