"use client";

import Loading from "@/components/Loading";
import ModalCreate from "@/components/ModalCreate";
import SelectGenre from "@/components/genre/genre.select";
import SongCard from "@/components/song/song.card";
import { Button } from "@/components/ui/button";
import { CREATE_SONG } from "@/requetes/mutations";
import { GET_SONGS } from "@/requetes/queries";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import useAuth from "../hook/auth.hook";

const songSchema = z.object({
  name: z.string().min(2),
  genreId: z.string().min(1),
});

export default function Songs() {
  const [genreId, setGenreId] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [limit /*setLimit*/] = useState<number>(5);

  const { data, loading, error, fetchMore } = useQuery(GET_SONGS, {
    variables: { genreId, limit },
  });

  const loadMore = async () => {
    if (!data?.songs?.hasMore || !data?.songs?.nextCursor) return;

    setIsFetchingMore(true);

    try {
      await fetchMore({
        variables: {
          genreId,
          cursor: data.songs.nextCursor,
          limit,
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleGenreChange = (value: string) => {
    setGenreId(value === "all" ? null : value);
  };

  const [mutateFunction] = useMutation(CREATE_SONG, {
    update(cache, { data }) {
      const newSong = data?.createSong;
      if (!newSong) return;

      if (genreId && newSong.genre?.id !== genreId) {
        return;
      }

      cache.modify({
        fields: {
          songs(existingSongs = []) {
            const newSongRef = cache.writeFragment({
              data: newSong,
              fragment: gql`
                fragment NewSong on Song {
                  id
                  name
                  author {
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

            const updatedItems = [
              newSongRef,
              ...existingSongs.items.slice(0, limit - 1),
            ];

            return { ...existingSongs, items: updatedItems };
          },
        },
      });
    },
    onCompleted(data) {
      toast.success(`Song ${data.createSong.name} created successfully`, {
        action: {
          label: "View",
          onClick: () => router.push(`/songs/${data.createSong.id}`),
        },
      });
    },
  });

  const create = async (values: { name: string; genreId: string }) => {
    await mutateFunction({
      variables: {
        createSongInput: { name: values.name, genreId: values.genreId },
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error?.message}</div>;

  if (!data?.songs) return <p>No songs found.</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Songs</h2>
        <div className="flex gap-2">
          <SelectGenre
            onChange={handleGenreChange}
            defaultValue={genreId || "all"}
            withAll
          />
          {isAuthenticated && (
            <ModalCreate
              title="song"
              onConfirm={create}
              schema={songSchema}
              defaultValues={{ name: "", genreId: "" }}
            />
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data.songs.items.length > 0 ? (
            data.songs.items.map((song) => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <div className="text-center">Aucun résultat.</div>
          )}
        </div>
      </div>
      {data.songs.hasMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore} disabled={isFetchingMore}>
            {isFetchingMore ? "Loading..." : "More"}
          </Button>
        </div>
      )}
    </div>
  );
}
