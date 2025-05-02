import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
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
import { gql } from "@/lib/graphql";
import { useMutation } from "@apollo/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const CREATE_SONG = gql(`
  mutation createSong($input: CreateSongInput!) {
    createSong(input: $input) {
      success
      song {
        id
        name
      }
    }
  }
`);



const GET_GENRES = gql(`
    query Genres2{
        genres{
            id
            name
        }
    }
`);
    

export default function CreateSongForm({ refetch }: { refetch: () => void }) {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SONG);
  const {data : genreData} = useQuery(GET_GENRES);

  const form = useForm<{ name: string, genreId: string }>({
    defaultValues: {
        name: "",
        genreId: "",
    },
  });
  async function onSubmit(values: { name: string, genreId: string }) {
    try {
      await mutateFunction({ variables: { input: { name: values.name, genreId: values.genreId } } });
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
                <FormLabel>Name of the song</FormLabel>
                <FormControl>
                  <Input placeholder="charly" {...field} minLength={3} />
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
                    <FormLabel>Genres</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a genre" />
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
          <Button type="submit" disabled={loading}>
            Create
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
          {data.createSong.success ? "Song created" : "Song not created"}
        </div>
      )}
    </div>
  );
}
