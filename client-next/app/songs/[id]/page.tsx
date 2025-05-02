"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
//@ts-ignore
import { Song } from "@/lib/graphql/graphql";
import { useParams } from "next/navigation";
import Link from "next/link";

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

export default function Song({ params }: { params: { id: string } }) {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id: id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song</h1>
      <div className="mt-4 flex gap-2 items-end">
        <h3>{data?.song.name}</h3>
        <p>by</p>
        <Link href={`/users/${data?.song.user.id}`}>
          <h3>{data?.song.user.name}</h3>
        </Link>
        <p>in</p>
        {data?.song.genre ? (
          <Link href={`/genres/${data?.song.genre.id}`}>
            <h3>{data?.song.genre.name}</h3>
          </Link>
        ) : (
          <h3>Unknown</h3>
        )}
      </div>
    </div>
  );
}
