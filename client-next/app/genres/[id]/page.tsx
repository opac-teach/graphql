"use client";

import Loading from "@/components/Loading";
import SongCard from "@/components/song/song.card";
import { GET_GENRE } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{data?.genre.name}</h2>
      <p>Number of songs: {data?.genre.songsCount}</p>
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {data?.genre.songs.map((song) => (
          <SongCard key={song.id} song={{ ...song, genre: data?.genre }} />
        ))}
      </div>
    </div>
  );
}
