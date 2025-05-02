"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";
import { gql } from "@/lib/graphql";

const GET_USERS = gql(`
  query Users {
    users {
      id
      name
      songCount
    }
  }
`);

export default function Users() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <div>
        {data?.users.map((user) => (
          <div key={user.id} className="flex gap-2">
            <Link href={`/users/${user.id}`}>{user.name}</Link>
            <p>Nombre de chansons: {user.songCount}</p>
          </div>
        ))}
      </div>

      <CreateUserForm refetch={refetch} />
    </div>
  );
}
