"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { gql } from "@/lib/graphql";
  

const GET_GENRES = gql(`
  query GenresCreateSong {
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

export default function FormSong({ refetch }: { refetch: () => void }) {
  const { data, loading: loadingG, error } = useQuery(GET_GENRES);
  const [createSong, { data : dataC, loading, error : errorC }] = useMutation(CREATE_SONG);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      genreId: ""
    }
  });

  async function onSubmit(values: FormValues) {
    try {
      await createSong({ variables: { input: values } });
      refetch();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  if (loadingG) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres: {error.message}</div>;

  return (

<div className="mt-4 max-w-md">
<Dialog>
  <DialogTrigger asChild>
    <Button>Crée un song</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Song</DialogTitle>
      <DialogDescription>
        Entrez le nom de la chanson et sélectionnez un genre.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Name</FormLabel>
              <FormControl>
                <Input placeholder="lady gaga" {...field} minLength={3} />
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.genres.map((genre: any) => (
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
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>

      {errorC && <div className="text-red-500">{errorC.message}</div>}
      {dataC && (
        <div
          className={
            dataC.createSong.success ? "text-green-500" : "text-red-500"
          }
        >
          {dataC.createSong.success ? "Son created" : "Son not created"}
        </div>
      )}
    </Form>
  </DialogContent>
</Dialog>
</div>

  );
}
