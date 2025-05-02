"use client";

import { useForm } from "react-hook-form";
import { gql } from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GET_GENRES = gql(`
    query GetGenres {
        genres {
            id
            name
            songsCount
        }
    }
`);

const CREATE_SONG = gql(`
    mutation CreateSong($input: CreateSongInput!) {
  createSong(input: $input) {
    name
    user {
      name
      id
    }
    id
    genre {
      id
      name
    }
  }
}
`);
  
export default function CreateSongForm({ refetch }: { refetch: () => void }) {
  const { data: genreData, loading: genreLoading } = useQuery(GET_GENRES);
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SONG);

  const form = useForm<{ name: string; genreId: string }>({
    defaultValues: {
      name: "",
      genreId: "",
    },
  });

  async function onSubmit(values: { name: string; genreId: string }) {
    try {
      await mutateFunction({ variables: { input: values } });
      form.reset();
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Ajouter une chanson</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la chanson</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la chanson" {...field} />
                </FormControl>
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
                      <SelectValue placeholder="Sélectionner un genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreData?.genres.map((genre: any) => (
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
          <Button type="submit" disabled={loading || genreLoading}>
            Ajouter
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-500">{error.message}</div>}
      {data && <div className="text-green-500">Votre chanson a été ajoutée !</div>}
    </div>
  );
}
