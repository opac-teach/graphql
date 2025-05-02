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
import { useParams } from "next/navigation";
  

const GET_GENRES = gql(`
  query GenresUpdateSong {
    genres {
      id
      name
    }
  }
`);

const UPDATE_SONG = gql(`
mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {
  updateSong(id: $updateSongId, input: $input) {
    success
  }
}
`);

type FormValues = {
  name: string;
  genreId: string;
};

export default function FormSongUpdate({ data_name, data_genreId, refetch }: { data_name : string ; data_genreId : string;  refetch: () => void }) {
  const { data: dataG, loading: loadingG } = useQuery(GET_GENRES);
  const [updateSong, { data, loading, error }] = useMutation(UPDATE_SONG);
  const { id } = useParams<{ id: string }>();

  const form = useForm<FormValues>({
    defaultValues: {
      name: data_name,
      genreId: data_genreId
    }
  });

  async function onSubmit(values: FormValues) {
    try {
      await updateSong({ variables: { updateSongId: id, input: values } });
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
        <Button>Modifier un song</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Update Song</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        {dataG?.genres.map((genre: {id: string, name: string}) => (
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

          {data && (
          <div
            className={
              data.updateSong.success ? "text-green-500" : "text-red-500"
            }
          >
            {data.updateSong.success ? "Son modified" : "Son not modified"}
          </div>
        )}
            </Form>
    </DialogContent>
    </Dialog>
</div>

  );
}
