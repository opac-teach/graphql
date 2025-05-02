"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_SONG = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      name
      genre {
        name
      }
      user {
        id
        name
      }
    }
  }
`;

export default function SongPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const song = data.song;

  return (
    <div>
      <h1>{song.name}</h1>
      <p>Genre : {song.genre.name}</p>
      <p>
        Créé par :{" "}
        <Link href={`/user/${song.user.id}`}>{song.user.name}</Link>
      </p>
    </div>
  );
}
