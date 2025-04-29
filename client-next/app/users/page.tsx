"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";
import Loading from "@/components/Loading";
import { GET_USERS } from "@/requetes/queries";

export default function Users() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <div>
        {data?.users.map((user) => (
          <div key={user.id} className="flex gap-2">
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      </div>

      <CreateUserForm refetch={refetch} />
    </div>
  );
}
