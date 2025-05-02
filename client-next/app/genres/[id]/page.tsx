"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
//@ts-ignore
import { Song } from "@/lib/graphql/graphql";
import { useParams } from "next/navigation";
import Link from "next/link";

const GET_GENRE = gql(`
   query Genre($id: ID!, $limit: Int!, $page: Int!) {
        genre(id: $id) {
            id
            name
            songs(limit: $limit, page: $page) {
                name
                id
            }
        }
   }
`);

export default function Song({ params }: { params: { id: string } }) {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      id: id,
      limit: 10,
      page: 1,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genre</h1>
      <div className="mt-4 flex gap-2 items-end">
        <h3>{data?.genre.name}</h3>
        <p>has</p>
        <h3>{data?.genre.songs.length} songs</h3> :
        {data?.genre.songs.map((song: Song) => (
          <div key={song.id} className="flex gap-2">
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
