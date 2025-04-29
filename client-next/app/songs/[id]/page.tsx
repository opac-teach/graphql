"use client";

import Loading from "@/components/Loading";
import { GET_SONG } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import { Music2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SongPage() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const song = data?.song;
  if (!song) return <div>Song not found</div>;

  return (
    <div>
      <h2>Song</h2>
      <div className="mt-4 border rounded-md p-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Music2 />
          {song.name}
        </h3>
        <Link href={`/users/${song.user.id}`} className="flex justify-end">
          By {song.user.name}
        </Link>
      </div>
    </div>
  );
}
