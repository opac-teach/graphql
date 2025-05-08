"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";
import { User } from "@/lib/graphql/graphql";
import { GET_USERS } from "../queries/user.query";

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <div>
        {data?.users.map((user: User) => (
          <div key={user.id} className="flex gap-2">
            <Link href={`/users/${user.id}`}>{user.name}</Link>
            <span>
              (Number of songs : {user.songsCount})
            </span>
          </div>
        ))}
      </div>

      <CreateUserForm />
    </div>
  );
}
