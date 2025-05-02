"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import DeleteSongButton from "./DeleteSongForm";
import { useState } from "react";
import FormSongUpdate from "./UpdateSongForm";
import { gql } from "@/lib/graphql";

export const GET_SONGINFO = gql(`
  query Song($songId: ID!) {
    song(id: $songId) {
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

export default function SongIdPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [deleted, setDeleted] = useState(false);

  const { data, loading, error, refetch} = useQuery(GET_SONGINFO, {
    variables: { songId: id },
  });

  if (loading) return <p>Loading...</p>;

  if (deleted) {
    // Affiche un message ou redirige
    setTimeout(() => {
      router.push("/songs");
    }, 3000);
    return <p className="text-green-600">Le son a été supprimé ! Redirection...</p>;
  }

  if (!data || error || !data.song) return <p>Informations vides</p>;

  return (
    <div>
      <h1>{data.song.name}</h1>
      <div>
        <p>By :</p>
        <Link href={`/users/${data.song.user.id}`}>
          {data.song.user.name}
        </Link>
      </div>
      <p>Genre : {data.song.genre.name}</p>
      <DeleteSongButton onDeleted={() => setDeleted(true)} />
      <FormSongUpdate data_name={data.song.name} data_genreId={data.song.genre.id} refetch={refetch} />
    </div>
  );
}
