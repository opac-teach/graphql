"use client";

import Loading from "@/components/Loading";
import { GET_USERS } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>

      <div className="flex gap-2 mt-2">
        {data?.users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function CardUser({ user }: { user: { id: string; name: string } }) {
  return <Link href={`/users/${user.id}`}>{user.name}</Link>;
}
