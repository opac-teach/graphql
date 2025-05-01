"use client";

import { gql } from "@/lib/graphql";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";

const CREATE_GENRE = gql(`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      success
      genre {
        id
        name
      }
    }
  }
`);

export default function CreateGenreForm({ refetch }: { refetch?: () => void }) {
  const form = useForm({ defaultValues: { name: "" } });
  const [createGenre, { error }] = useMutation(CREATE_GENRE);

  async function onSubmit(values: { name: string }) {
    await createGenre({ variables: { input: values } });
    form.reset();
    refetch?.();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <Input
        {...form.register("name", { required: true })}
        placeholder="Nom du genre"
      />
      <Button type="submit">Ajouter le genre</Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
