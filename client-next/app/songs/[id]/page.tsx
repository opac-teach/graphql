"use client";

import { gql } from "@/lib/graphql";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

const DELETE_SONG = gql(`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      success
    }
  }
`);

const UPDATE_SONG = gql(`
  mutation UpdateSong($id: ID!, $input: UpdateSongInput!) {
    updateSong(id: $id, input: $input) {
      success
      song {
        id
        name
      }
    }
  }
`);

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: { id },
  });

  const [deleteSong] = useMutation(DELETE_SONG);
  const [updateSong] = useMutation(UPDATE_SONG);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (data?.song?.name) {
      setNewName(data.song.name);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const song = data?.song;
  if (!song) return <div>Song not found</div>;

  async function handleDelete() {
    try {
      await deleteSong({ variables: { id } });
      router.push("/songs");
      router.refresh(); 
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      await updateSong({ variables: { id, input: { name: newName } } });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>{song.name}</h1>
      <p>
        Created by:{" "}
        <Link href={`/users/${song.user.id}`} className="underline">
          {song.user.name}
        </Link>
      </p>
      <p>
        Genre:{" "}
        <Link href={`/genres/${song.genre.id}`} className="underline">
          {song.genre.name}
        </Link>
      </p>

      <div className="my-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <Button onClick={handleUpdate}>Modifier</Button>
      </div>

      <Button variant="destructive" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
}
