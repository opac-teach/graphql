"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateSongForm from "./CreateSongForm";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {createApolloClient} from "@/lib/apollo";

const client = createApolloClient();

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

const cache = client.cache.readQuery({
  query: GET_SONGS,
});
console.log(cache)

export default function Songs() {
  const [page, setPage] = useState(0);
  const { data, loading, error, refetch } = useQuery(GET_SONGS, {
    variables: {
      pagination: {
        page: page,
        pageSize: 10,
      },
    },
  });


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>

        <Select value={page} onValueChange={setPage}>
          <SelectTrigger>
            <SelectValue placeholder="page" />
          </SelectTrigger>
            <SelectContent >
                <SelectItem value={0} required >1</SelectItem>
                <SelectItem value={1}>2</SelectItem>
                <SelectItem value={2}>3</SelectItem>
            </SelectContent>

        </Select>
      </div>
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
          <tr key={song.id} >
            <th><Link href={`/songs/${song.id}`}>{song.name}</Link></th>
            <th>{song.genre.name} </th>
            <th>{song.user.name}</th>
          </tr>
        ))}
        </tbody>
      </table>
      <CreateSongForm refetch={refetch}/>
    </div>

  );
}
