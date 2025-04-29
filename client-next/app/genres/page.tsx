"use client";

import Loading from "@/components/Loading";
import ModalCreate from "@/components/ModalCreate";
import { Badge } from "@/components/ui/badge";
import { CREATE_GENRE } from "@/requetes/mutations";
import { GET_GENRES } from "@/requetes/queries";
import { getColorByGenre } from "@/utils/genreColor";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

export default function Genres() {
  const { data, loading, error } = useQuery(GET_GENRES);

  const [mutateFunction] = useMutation(CREATE_GENRE, {
    update(cache, { data }) {
      const newGenre = data?.createGenre?.genre;
      if (!newGenre) return;

      cache.modify({
        fields: {
          genres(existingGenres = []) {
            const newGenreRef = cache.writeFragment({
              data: newGenre,
              fragment: gql`
                fragment NewGenre on Genre {
                  id
                  name
                }
              `,
            });

            return [...existingGenres, newGenreRef];
          },
        },
      });
    },
  });

  const create = async (name: string) => {
    await mutateFunction({
      variables: { input: { name } },
    });
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Genres</h2>
        <ModalCreate title="genre" onConfirm={create} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data?.genres.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <Badge
                variant="outline"
                style={{
                  backgroundColor: getColorByGenre(genre.name),
                }}
              >
                {genre.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
