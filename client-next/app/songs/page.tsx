"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "@/components/Loading";
import SongCard from "@/components/song/song.card";
import { useState } from "react";
import { GET_GENRES, GET_SONGS } from "@/requetes/queries";
import ModalCreate from "@/components/ModalCreate";
import SelectGenre from "@/components/genre/genre.select";
import { z } from "zod";
import { CREATE_SONG } from "@/requetes/mutations";

const songSchema = z.object({
  name: z.string().min(2),
  genreId: z.string().min(1),
});

export default function Songs() {
  const [genre, setGenre] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_SONGS, {
    variables: {
      limit: 20,
      offset: 0,
      genreId: genre,
    },
  });

  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useQuery(GET_GENRES);

  const handleGenreChange = (value: string) => {
    setGenre(value === "all" ? null : value);
  };

  const [mutateFunction] = useMutation(CREATE_SONG, {
    update(cache, { data }) {
      const newSong = data?.createSong?.song;
      if (!newSong) return;

      cache.modify({
        fields: {
          songs(existingSongs = []) {
            const newSongRef = cache.writeFragment({
              data: newSong,
              fragment: gql`
                fragment NewSong on Song {
                  id
                  name
                  user {
                    id
                    name
                  }
                  genre {
                    id
                    name
                  }
                }
              `,
            });

            return [...existingSongs, newSongRef];
          },
        },
      });
    },
  });

  const create = async (values: { name: string; genreId: string }) => {
    await mutateFunction({
      variables: { input: { name: values.name, genreId: values.genreId } },
    });
  };

  if (loading || genresLoading) return <Loading />;
  if (error || genresError)
    return <div>Error: {error?.message || genresError?.message}</div>;

  if (!data?.songs) return <p>No songs found.</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Songs</h2>
        <div className="flex gap-2">
          <SelectGenre
            genres={genresData?.genres}
            onChange={handleGenreChange}
            defaultValue={genre || "all"}
            withAll
          />
          <ModalCreate
            title="song"
            onConfirm={create}
            genres={genresData?.genres}
            schema={songSchema}
            defaultValues={{ name: "", genreId: "" }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data.songs.length > 0 ? (
            data.songs.map((song) => <SongCard key={song.id} song={song} />)
          ) : (
            <div className="text-center">Aucun résultat.</div>
          )}
        </div>
      </div>
    </div>
  );
}
