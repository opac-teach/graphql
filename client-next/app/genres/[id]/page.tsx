"use client";

import Loading from "@/components/Loading";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import SongCard from "@/components/song/song.card";
import { DELETE_GENRE } from "@/requetes/mutations";
import { GET_GENRE } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: {
      id,
    },
  });

  const [deleteGenreMutation] = useMutation(DELETE_GENRE, {
    onCompleted: (data) => {
      if (data.deleteGenre.success) {
        router.push("/genres");
        toast.success("Genre deleted successfully!");
      } else {
        toast.error("Error deleting genre.");
      }
    },
    update(cache, { data }) {
      const deletedGenreId = data?.deleteGenre?.id;
      if (!deletedGenreId) return;

      // cache.modify({
      //   fields: {
      //     genres(existingGenres = []) {
      //       return existingGenres.filter(
      //         (genreRef: { __ref: string }) =>
      //           genreRef.__ref !== `Genre:${deletedGenreId}`
      //       );
      //     },
      //   },
      // });
      cache.evict({
        id: cache.identify({ __typename: "Genre", id: deletedGenreId }),
      });
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2>{data?.genre.name}</h2>
          {/* <p>Number of songs: {data?.genre.songsCount}</p> */}
        </div>
        {isAdmin && (
          <ModalConfirmDelete
            title="genre"
            onDelete={() => deleteGenreMutation({ variables: { id } })}
          />
        )}
      </div>
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {data?.genre?.songs.map((song) => (
          <SongCard key={song.id} song={{ ...song, genre: data?.genre }} />
        ))}
      </div>
    </div>
  );
}
