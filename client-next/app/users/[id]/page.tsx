"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { GET_USER } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";

function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function User() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{data?.user.name.toLocaleUpperCase()}</h2>
      <h3>Songs</h3>
      <div>
        {data?.user.songs?.map((song) => (
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
    </div>
  );
}
