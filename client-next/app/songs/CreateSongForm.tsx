"use clients"

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
import {useMutation, useQuery} from "@apollo/client";
import { useForm } from "react-hook-form";
import { gql } from "@/lib/graphql";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const CREATE_SONG = gql(`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      success
      song {
        id
        name
        genre {
          id
          name
        }
      }
    }
  }
`);

const GET_GENRES = gql(`
  query Genres {
    genres {
      id
      name
    }
  }
`);

export default function CreateSongForm({refetch}: {refetch: () => void}) {
  const [mutateFunction, {loading}] = useMutation(CREATE_SONG);
  const { data } = useQuery(GET_GENRES);

  const form = useForm<{ name: string; genreId?: string }>({
    defaultValues: {
      name: "",
      genreId: "",
    },
  });
  async function onSubmit(values: { name: string; genreId?: string }) {
    try {
      await mutateFunction({
        variables: {
          input: {
            name: values.name,
            genreId: values.genreId || undefined,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Create Song</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song Name</FormLabel>
                <FormControl>
                  <Input placeholder="Song Name" {...field} minLength={3} />
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
                <FormLabel>Genre (optionnel)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisis un genre (optionnel)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
