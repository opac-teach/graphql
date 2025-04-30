"use client";

import GenreBadge from "@/components/genre/genre.badge";
import Loading from "@/components/Loading";
import ModalCreate from "@/components/ModalCreate";
import { Button } from "@/components/ui/button";
import { UPDATE_SONG } from "@/requetes/mutations";
import { GET_SONG } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Music2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const songSchema = z.object({
  name: z.string().min(2),
  genreId: z.string().min(1),
});

export default function SongPage() {
  const { id } = useParams<{ id: string }>();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });

  const [mutateFunction] = useMutation(UPDATE_SONG, {
    refetchQueries: [GET_SONG],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      toast.success(`Song ${data.updateSong.song.name} updated successfully!`);
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const song = data?.song;
  if (!song) return <div>Song not found</div>;

  const update = async (values: FieldValues) => {
    if (values.name === song.name && values.genreId === song.genre.id) {
      return;
    }
    try {
      await mutateFunction({
        variables: {
          input: {
            name: values.name,
            genreId: values.genreId,
          },
          updateSongId: id,
        },
      });
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const isOwner = song.user.id === userId;

  return (
    <div>
      <h2>Song</h2>
      <div className="max-w-2xl mx-auto mt-4">
        <div className="border rounded-md p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Music2 />
              {song.name}
            </h3>
            <GenreBadge name={song.genre.name} />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link href={`/users/${song.user.id}`} className="flex justify-end">
              By {isOwner ? "you" : song.user.name}
            </Link>
            {isOwner && (
              <div className="flex  gap-2">
                <ModalCreate
                  title="song"
                  isUpdate
                  onConfirm={update}
                  schema={songSchema}
                  defaultValues={{ name: song.name, genreId: song.genre.id }}
                />
                <Button variant="destructive">
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
