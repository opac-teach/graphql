"use client";

import Loading from "@/components/Loading";
import SongCard from "@/components/song/song.card";
import { GET_USER } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function User() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const allSongs = data?.user.songs;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2> {data?.user.name}</h2>
          {allSongs && <p>Number of songs: {allSongs.length}</p>}
        </div>
      </div>
      {allSongs && allSongs.length > 0 ? (
        <div className="flex justify-center gap-2 flex-wrap mt-4">
          {allSongs?.map((song) => (
            <div key={song.id} className="flex gap-2">
              <SongCard key={song.id} song={{ ...song, author: data.user }} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No Result</p>
      )}
    </div>
  );
}
