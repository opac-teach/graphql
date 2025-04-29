import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/client";
import {useForm} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

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
`)

const GET_GENRE = gql(`
query Genres {
  genres {
    id
    name
  }
}
`)

export default function CreateSongForm({ refetch }: { refetch: () => void }) {
    const { data: dataGenre, loadingGenre } = useQuery(GET_GENRE)
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SONG)

    const form = useForm<{name: string}>({
        defaultValues: {
            name: "",
            genreId: ""
        }
    })

    async function onSubmit(values: { name: string, genreId: string }) {
        try {
            await mutateFunction({ variables: {
                input: {
                    name: values.name,
                    genreId: values.genreId
                }
                }
            })
            refetch()
        } catch (e) {
            console.error(e)
        }
    }

    if (loadingGenre) return <div>Loading...</div>;

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
                                    <Input placeholder="John Doe" {...field} minLength={3} />
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {dataGenre?.genres.map((genre) => (
                                            <SelectItem value={genre.id}>{ genre.name }</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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