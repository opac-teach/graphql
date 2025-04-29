import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

const UPDATE_SONG = gql(`
mutation Mutation($updateSongId: ID!, $input: CreateUserInput) {
  updateSong(id: $updateSongId, input: $input) {
    success
    song {
      id
      name
    }
  }
}
`)

const DELETE_SONG = gql(`
mutation DeleteSong($deleteSongId: ID!) {
  deleteSong(id: $deleteSongId) {
    success
  }
}
`)

export default function UpdateSongFrom({ song, refetch }: { refetch: () => void }) {
    const [mutateFunction, { data, loading, error }] = useMutation(UPDATE_SONG)
    const [deleteFunction, {data: deleteData }] = useMutation(DELETE_SONG)

    const form = useForm<{name:string}>({
        defaultValues: {
            name: song.name
        }
    })

    async function onSubmit(values: { name: string }) {
        try {
            await mutateFunction({ variables: {
                input: {
                    name: values.name
                },
                updateSongId: song.id
            }})
            refetch()
        } catch (e) {
            console.error(e)
        }

    }

    async function onDelete() {
        try {
            await deleteFunction({ variables: {
                    deleteSongId: song.id
            }})
            if (deleteData.deleteSong.success) {
                await redirect('/songs')
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="mt-4 max-w-md">
            <h2 className="mb-4">Update Song</h2>
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
                    <Button className="cursor-pointer" type="submit" disabled={loading}>
                        update
                    </Button>
                    <Button className="ml-5 cursor-pointer" variant="destructive" onClick={onDelete}>
                        delete
                    </Button>
                </form>
            </Form>
            {error && <div className="text-red-500">{error.message}</div>}
            {data && (
                <div
                    className={
                        data.updateSong.success ? "text-green-500" : "text-red-500"
                    }
                >
                    {data.updateSong.success ? "Song updated" : "Song not updated"}
                </div>
            )}
        </div>
    );
}