"use client";

import { GET_SONG, DELETE_SONG } from "@/app/queries/song.query";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

export default function DeleteSongButton() {
  const { id } = useParams<{ id: string }>();
	const router = useRouter();

  const { data: songData, loading: songLoading, error: songError } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });
  const [mutateFunction, { data: deletedSongData, loading: deletedSongLoading, error: deletedSongError }] = useMutation(DELETE_SONG, {
    update(cache, { data }) {
      if (data?.deleteSong.success) {
        cache.evict({
          id: cache.identify({ __typename: "Song", id }),
        });

        const typenames = [
          { __typename: "Genre", id: songData?.song.genre.id },
          { __typename: "User", id: songData?.song.user.id }
        ]

        typenames.forEach((typename) => {
          cache.modify({
            id: cache.identify(typename),
            fields: {
              songsCount(existingSongsCount: number = 0) {
                return existingSongsCount - 1;
              }
            },
          })
        });
      }
    },
  });
	
  async function handleClick() {
    try {
      await mutateFunction({ variables: { deleteSongId: id } });
      router.push('/songs');
    } catch (error) {
      console.error(error);
    }
  }

  if (songLoading) return <div>Loading song...</div>;
  if (songError) return <div>Error: {songError.message}</div>;

  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Delete Song</h2>
			<Button onClick={handleClick} disabled={deletedSongLoading}>
				Delete
			</Button>
      {deletedSongError && <div className="text-red-500">{deletedSongError.message}</div>}
      {deletedSongData && (
        <div
          className={
            deletedSongData.deleteSong.success ? "text-green-500" : "text-red-500"
          }
        >
          {deletedSongData.deleteSong.success ? "Song deleted" : "Song not deleted"}
        </div>
      )}
    </div>
  );
}
