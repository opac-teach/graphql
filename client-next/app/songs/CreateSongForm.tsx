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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { gql } from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";


const GET_GENRES = gql(`
    query Genres {
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
                user {
                    id
                    name
                }
                genre {
                    id
                    name
                }
            }
        }
    }
`);

export default function CreateSongForm({ refetch }: { refetch: () => void }) {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SONG);
  const {data:dataGenre, loading: loadingGenre, error: errorGenre} = useQuery(GET_GENRES);

  const form = useForm<{ name: string, genreId: string }>({
    defaultValues: {
      name: "",
      genreId: ""
    },
  });

  async function onSubmit(values: { name: string, genreId: string }) {
    try {
      console.log(values)
      await mutateFunction({ variables: { input: { name: values.name, genreId: values.genreId } } });
      refetch();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Add new Song </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song title</FormLabel>
                <FormControl>
                  <Input placeholder="song title" {...field} minLength={3} />
                </FormControl>
                <FormLabel> Song genre</FormLabel>
                <FormMessage />
              </FormItem>


            )}
          /><FormField
            control={form.control}
            name="genreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Song genre</FormLabel>
                <FormControl>

                  <Select {...field} onValueChange={field.onChange} required>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataGenre?.genres.map(genre => (
                        <SelectItem key={genre.id} value={genre.id}> {genre.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </FormControl>

                <FormMessage />
              </FormItem>


            )}
          />
          <Button type="submit" disabled={loading}>
            Add
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-500">{error.message}</div>}
      {data && (
        <div
          className={
            data.createSong.success ? "text-green-500" : "text-red-500"
          }
        >
          {data.createSong.success ? "song created" : "User not created"}
        </div>
      )}
    </div>
  );
}
