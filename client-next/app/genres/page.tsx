"use client";

import GenreBadge from "@/components/genre/genre.badge";
import Loading from "@/components/Loading";
import ModalCreate from "@/components/ModalCreate";
import { CREATE_GENRE } from "@/requetes/mutations";
import { GET_GENRES } from "@/requetes/queries";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";

const genreSchema = z.object({
  name: z.string().min(2),
});

export default function Genres() {
  const { data, loading, error } = useQuery(GET_GENRES);

  const [mutateFunction] = useMutation(CREATE_GENRE, {
    update(cache, { data }) {
      const newGenre = data?.createGenre;
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
              // query: GET_GENRES,
            });

            return [...existingGenres, newGenreRef];
          },
        },
      });
    },
    onCompleted: (data) => {
      toast.success(`Genre ${data.createGenre.name} created successfully!`);
    },
  });

  const create = async (values: { name: string }) => {
    await mutateFunction({
      variables: { createGenreInput: { name: values.name } },
    });
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Genres</h2>
        <ModalCreate
          title="genre"
          schema={genreSchema}
          defaultValues={{ name: "" }}
          onConfirm={create}
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {data?.genres.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <GenreBadge name={genre.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
