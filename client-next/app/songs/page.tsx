"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateSongForm from "./CreateSongForm";


const GET_SONGS = gql(`
  query Songs ($pagination: PaginationInput){
    songs(pagination: $pagination) {
      id
      name
        user {
            name
        }
        genre {
            name
        }
    }
  }
`);

export default function Songs() {
  const { data, loading, error, refetch } = useQuery(GET_SONGS, {
    variables: {
      pagination: {
        page: 0,
        pageSize: 10,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Genre</th>
        <th>Author</th>
      </tr>
      </thead>
      <tbody>
        {data?.songs.map((song) => (
          <tr>
            <th><Link href={`/songs/${song.id}`}>{song.name}</Link></th>
            <th>{song.genre.name} </th>
            <th>{song.user.name}</th>
          </tr>
        ))}
      </tbody>
     <CreateSongForm refetch={refetch}/>
    </table>
  );
}
