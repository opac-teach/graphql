"use client";

import useAuth from "@/app/hook/auth.hook";
import Loading from "@/components/Loading";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import SongCard from "@/components/song/song.card";
import { DELETE_GENRE } from "@/requetes/mutations";
import { GET_GENRE } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      id,
    },
  });

  const [deleteGenreMutation] = useMutation(DELETE_GENRE, {
    onCompleted: (data) => {
      if (data.removeGenre.success) {
        router.push("/genres");
        toast.success("Genre deleted successfully!");
      } else {
        toast.error("Error deleting genre.");
      }
    },
    update(cache, { data }) {
      const deletedGenreId = data?.removeGenre?.id;
      if (!deletedGenreId) return;

      cache.evict({
        id: cache.identify({ __typename: "Genre", id: deletedGenreId }),
      });
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const allSongs = data?.genre.songs;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2>{data?.genre.name}</h2>
          {allSongs && <p>Number of songs: {allSongs.length}</p>}
        </div>
        {/* ajouter si ADMIN */}
        {isAuthenticated && (
          <ModalConfirmDelete
            title="genre"
            onDelete={() => deleteGenreMutation({ variables: { id } })}
          />
        )}
      </div>
      {allSongs && allSongs.length > 0 ? (
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data.genre.songs?.map((song) => (
            <SongCard key={song.id} song={{ ...song, genre: data.genre }} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No result</p>
      )}
    </div>
  );
}
