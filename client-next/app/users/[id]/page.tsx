"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { gql } from "@/lib/graphql";
import { useState, useEffect } from "react";

const GET_USER = gql(`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      songs {
        id
        name
      }
    }
  }
`);

const UPDATE_USER = gql(`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      success
      user {
        id
        name
      }
      message
    }
  }
`);

const DELETE_USER = gql(`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`);


function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function User() {
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const [newName, setNewName] = useState("");

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (data?.user?.name) {
      setNewName(data.user.name);
    }
  }, [data]);

  async function handleUpdate() {
    await updateUser({ variables: { id, input: { name: newName } } });
  }

  async function handleDelete() {
    await deleteUser({ variables: { id } });
    router.push("/users");
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
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={() => loginAs(data?.user.id ?? "")}>
          Login as {data?.user.name}
        </Button>
      </div>
      <input
          className="border p-2 mt-4"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={handleUpdate} className="ml-2">Modifier</Button>
      <Button onClick={handleDelete} variant="destructive" className="ml-2">Supprimer</Button>
    </div>

  );
}
