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

  // const [deleteGenreMutation] = useMutation(DELETE_GENRE, {
  //   onCompleted: (data) => {
  //     if (data.removeGenre.success) {
  //       router.push("/genres");
  //       toast.success("Genre deleted successfully!");
  //     } else {
  //       toast.error("Error deleting genre.");
  //     }
  //   },
  //   update(cache, { data }) {
  //     const deletedGenreId = data?.removeGenre?.id;
  //     if (!deletedGenreId) return;

  //     // cache.modify({
  //     //   fields: {
  //     //     genres(existingGenres = []) {
  //     //       return existingGenres.filter(
  //     //         (genreRef: { __ref: string }) =>
  //     //           genreRef.__ref !== `Genre:${deletedGenreId}`
  //     //       );
  //     //     },
  //     //   },
  //     // });
  //     cache.evict({
  //       id: cache.identify({ __typename: "Genre", id: deletedGenreId }),
  //     });
  //   },
  // });

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
        {/* <ModalConfirmDelete
            title="genre"
            onDelete={() => deleteGenreMutation({ variables: { id } })}
          /> */}
      </div>
      {allSongs && allSongs.length > 0 ? (
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data.genre.songs?.map((song) => (
            <SongCard key={song.id} song={{ ...song, genre: data.genre }} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">Aucun son pour ce genre.</p>
      )}
    </div>
  );
}
