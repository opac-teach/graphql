"use client";

import { useForm } from "react-hook-form";
import { gql } from "@/lib/graphql";
import { useMutation } from "@apollo/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CREATE_GENRE = gql(`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      id
      name
    }
  }
`);

export default function CreateGenreForm({ refetch }: { refetch: () => void }) {
  const [createGenre, { data, loading, error }] = useMutation(CREATE_GENRE);

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: { name: string }) {
    try {
      await createGenre({ variables: { input: values } });
      form.reset();
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Ajouter un Genre</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du Genre</FormLabel>
                <FormControl>
                  <Input placeholder="exemple : Jazz, Pop, Rock..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Ajouter
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-500">{error.message}</div>}
      {data && <div className="text-green-500">Le genre a été ajouté !</div>}
    </div>
  );
}
