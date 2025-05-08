"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import UpdateSongForm from "./UpdateSongForm";
import DeleteSongButton from "./DeleteSongButton";
import { GET_SONG } from "@/app/queries/song.query";

export default function Song() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song</h1>
      <h3>{data?.song.name}</h3>
      <h2>Author</h2>
      <div>
				<Link href={`/users/${data?.song.user.id}`}> {data?.song.user.name}</Link>
      </div>
      <h2>Genre</h2>
      <div>
        <Link href={`/genres/${data?.song.genre.id}`}> {data?.song.genre.name}</Link>
      </div>
      <UpdateSongForm />
      <DeleteSongButton />
    </div>
  );
}
