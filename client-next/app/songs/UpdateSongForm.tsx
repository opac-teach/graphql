"use client";

import { useForm } from "react-hook-form";
import { gql } from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const GET_GENRES = gql(`
    query GetGenres {
        genres {
            id
            name
            songsCount
        }
    }
`);

const UPDATE_SONG = gql(`
    mutation UpdateSong($input: UpdateSongInput!) {
    updateSong(input: $input) {
        id
        name
        genre {
        id
        name
        }
        user {
        id
        name
        }
    }
    }
`);

export default function UpdateSongForm({
  song,
  refetch,
}: {
  song: { id: string; name: string; genre: { id: string } };
  refetch: () => void;
}) {
  const { data: genreData } = useQuery(GET_GENRES);
  const [updateSong, { loading, error }] = useMutation(UPDATE_SONG);

  const form = useForm<{ name: string; genreId: string }>({
    defaultValues: {
      name: song.name,
      genreId: song.genre.id,
    },
  });

  async function onSubmit(values: { name: string; genreId: string }) {
    try {
      await updateSong({
        variables: {
          input: {
            id: song.id,
            name: values.name,
            genreId: values.genreId,
          },
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4">Modifier la chanson</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreData?.genres.map((genre) => (
                        <SelectItem key={genre.id} value={genre.id}>
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>Mettre à jour</Button>
        </form>
      </Form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
