"use client";

import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CREATE_SONG = gql(`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      success
      song {
        id
        name
      }
    }
  }
`);

const GET_GENRES = gql(`
  query GetGenres {
    genres {
      id
      name
    }
  }
`);

export default function CreateSongForm({ refetch }: { refetch?: () => void }) {
  const { data } = useQuery(GET_GENRES);
  const [createSong] = useMutation(CREATE_SONG);
  const form = useForm({ defaultValues: { name: "", genreId: "" } });

  async function onSubmit(values: { name: string; genreId: string }) {
    await createSong({ variables: { input: values } });
    form.reset();
    refetch?.();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <Input {...form.register("name", { required: true })} placeholder="Nom de la chanson" />
      <select {...form.register("genreId", { required: true })} className="border p-2 rounded w-full">
        <option value="">Choisir un genre</option>
        {data?.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <Button type="submit">Ajouter</Button>
    </form>
  );
}
