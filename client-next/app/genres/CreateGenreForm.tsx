"use client";

import { useForm } from "react-hook-form";
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
import { Reference, useMutation } from "@apollo/client";
import { CREATE_GENRE } from "../queries/genre.query";
import { GENRE_CREATION_FRAGMENT } from "../fragments/genre.fragment";

export default function CreateGenreForm() {
  const [mutateFunction, { data: genreData, loading: genreLoading, error: genreError }] = useMutation(CREATE_GENRE, {
    update(cache, { data }) {
      if (data?.createGenre.success) {
        const newGenreRef = cache.writeFragment({
          id: `${data?.createGenre.genre.__typename}:${data?.createGenre.genre.id}`,
          fragment: GENRE_CREATION_FRAGMENT,
          fragmentName: 'GenreCreationFragment',
          data: data?.createGenre.genre
        });

        if (newGenreRef) {
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              genres(existingGenres: readonly Reference[] = []) {
                return [...existingGenres, newGenreRef];
              }
            },
          });
        }
      }
    },
  });

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: { name: string }) {
    try {
      await mutateFunction({ variables: { input: { name: values.name } } });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Create Genre</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre name*</FormLabel>
                <FormControl>
                  <Input placeholder="Fantastic" {...field} required minLength={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
						<span className="text-xs italic">(*) : Champ requis</span>
					</div>
          <Button type="submit" disabled={genreLoading}>
            Create
          </Button>
        </form>
      </Form>
      {genreError && <div className="text-red-500">{genreError.message}</div>}
      {genreData && (
        <div
          className={
            genreData.createGenre.success ? "text-green-500" : "text-red-500"
          }
        >
          {genreData.createGenre.success ? "Genre created" : "Genre not created"}
        </div>
      )}
    </div>
  );
}
