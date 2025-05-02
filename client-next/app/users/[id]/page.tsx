"use client";

import { Button } from "@/components/ui/button";
import {useMutation, useQuery} from "@apollo/client";
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
      }
      songCount
    }
  }
`);

const DELETE_SONG = gql(`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      success
      song {
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

export default function User() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const [deleteSong] = useMutation(DELETE_SONG);
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      try {
        await deleteSong({ variables: { id } });
        refetch();
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  }

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
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
            <div className="mt-4">
              <button
                onClick={() => handleDelete(song.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p>Song count : {data?.user.songCount}</p>
      </div>

      <div className="mt-4">
        <Button onClick={() => loginAs(data?.user.id ?? "")}>
          Login as {data?.user.name}
        </Button>
      </div>
    </div>
  );
}
