import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

const CREATE_GENRE = gql(`
    mutation CreateGenre($input: CreateGenreInput!) {
      createGenre(input: $input) {
        success
        genre {
          id
          name
        }
      }
    }
`)

export default function CreateGenreForm({ refetch }: { refetch: () => void }) {
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_GENRE)

    const form = useForm<{name: string}>({
        defaultValues: {
            name: ""
        }
    })

    async function onSubmit(values: {name: string}) {
        try {
            await mutateFunction({
                variables: {
                    input: {
                        name: values.name
                    }
                }
            })
            refetch()
        } catch (e) {
            console.error(e)
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
                                <FormLabel>Genre Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rock" {...field} minLength={3} />
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
                    {data.createSong.success ? "Genre created" : "Genre not created"}
                </div>
            )}
        </div>
    );
}