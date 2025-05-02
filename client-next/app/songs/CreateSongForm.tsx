"use client";

import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@/lib/graphql";

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
  query GetAllGenres {
    genres {
      id
      name
    }
  }
`);

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

type FormValues = {
  name: string;
  genreId: string;
};

export default function CreateSongForm({ refetch }: { refetch: () => void }) {
  const { data: genresData, loading: genresLoading } = useQuery(GET_GENRES);
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SONG);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      genreId: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await mutateFunction({ variables: { input: { name: values.name, genreId: values.genreId } } });
      refetch();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 max-w-md border rounded-xl p-6 shadow bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-6">🎵 Créer une chanson</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la chanson</FormLabel>
                <FormControl>
                  <Input placeholder="Classique" {...field} minLength={3} />
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genresData?.genres?.map((genre) => (
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
          <Button type="submit" disabled={loading || genresLoading}>
            Créer
          </Button>
        </form>
      </Form>

      {error && <div className="text-red-500 mt-4">{error.message}</div>}
      {data && (
        <div className={`mt-4 ${data.createSong.success ? "text-green-500" : "text-red-500"}`}>
          {data.createSong.success ? "Chanson créée !" : "Échec de la création"}
        </div>
      )}
    </div>
  );
}
