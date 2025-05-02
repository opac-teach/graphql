"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import { useMutation } from "@apollo/client";
import CreateSongForm from "./CreateSongForm";

const GET_SONGS = gql(`
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
`);

const DELETE_SONG = gql(`
  mutation deleteSong($id: ID!) {
    deleteSong(id: $id) {
      success
      song {
        id
        name
      }
    }
  }
`);

export default function Songs() {
  const { data, loading, error, refetch } = useQuery(GET_SONGS);
    const [mutateFunction2, { data: data2, loading: loading2, error: error2 }] = useMutation(DELETE_SONG);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        {data?.songs.map((song) => (
          <div key={song.id} className="flex gap-2">
            <p onClick={() => mutateFunction2({ variables: { id: song.id } }).then(() => refetch())}>x</p>
            <div>
              <Link href={`/songs/${song.id}`}>{song.name}</Link> par <Link href={`/users/${song.user.id}`}>{song.user.name}</Link> du type <Link href={`/genres/${song.genre.id}`}>{song.genre.name}</Link>
            </div>
          </div>
        ))}
      </div>
      <CreateSongForm refetch={refetch} />
    </div>
  );
}
