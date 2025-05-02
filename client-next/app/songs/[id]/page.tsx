"use client";

import useAuth from "@/app/hook/auth.hook";
import GenreBadge from "@/components/genre/genre.badge";
import Loading from "@/components/Loading";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import ModalCreate from "@/components/ModalCreate";
import { DELETE_SONG, UPDATE_SONG } from "@/requetes/mutations";
import { GET_SONG } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Music2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const songSchema = z.object({
  name: z.string().min(2),
  genreId: z.string().min(1),
});

export default function SongPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: {
      id,
    },
    fetchPolicy: "cache-and-network",
  });

  const [updateSongMutation] = useMutation(UPDATE_SONG, {
    refetchQueries: [GET_SONG],
    onCompleted: (data) => {
      toast.success(`Song ${data.updateSong.name} updated successfully!`);
    },
  });

  const [deleteSongMutation] = useMutation(DELETE_SONG, {
    onCompleted: (data) => {
      if (data.removeSong.success) {
        router.push("/songs");
        toast.success("Song deleted successfully!");
      } else {
        toast.error("Error deleting song.");
      }
    },
    update(cache, { data }) {
      const deletedSongId = data?.removeSong.id;
      if (!deletedSongId) return;

      cache.modify({
        fields: {
          songs(existingSongs = {}) {
            return {
              ...existingSongs,
              items: existingSongs.items.filter(
                (songRef: { __ref: string }) =>
                  songRef.__ref !== `Song:${deletedSongId}`
              ),
            };
          },
        },
      });
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const song = data?.song;
  if (!song) return <div className="text-center">Song not found</div>;

  const update = async (values: FieldValues) => {
    if (values.name === song.name && values.genreId === song.genre?.id) {
      return;
    }
    try {
      await updateSongMutation({
        variables: {
          updateSongInput: {
            name: values.name,
            genreId: values.genreId,
            id,
          },
        },
      });
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const isOwner = song.author?.id === user?.id;

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
            <GenreBadge name={song.genre?.name} />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link
              href={`/users/${song.author?.id}`}
              className="flex justify-end"
            >
              By {isOwner ? "you" : song.author?.name}
            </Link>
            {isOwner && (
              <div className="flex  gap-2">
                <ModalCreate
                  title="song"
                  isUpdate
                  onConfirm={update}
                  schema={songSchema}
                  defaultValues={{ name: song.name, genreId: song.genre?.id }}
                />
                <ModalConfirmDelete
                  title="song"
                  onDelete={() => deleteSongMutation({ variables: { id } })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
