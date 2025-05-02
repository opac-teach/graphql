"use client";

import {useForm} from "react-hook-form";
import {useQuery, useMutation} from "@apollo/client";
import {gql} from "@/lib/graphql"
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const GET_GENRES = gql(`
    query GetGenresUpdate {
        genres {
            id
            name
        }
    }
`);

const GET_SONG = gql(`
    query GetSongUpdate($id: ID!) {
        songById(id: $id) {
            id
            name
            genre {
                id
                name
            }
        }
    }
`);

const UPDATE_SONG = gql(`
    mutation UpdateSong($id: ID!, $input: UpdateSongInput!) {
        updateSong(id: $id, input: $input) {
            success
            song {
                id
                name
            }
        }
    }
`);

export default function UpdateSongForm({ name, genreId, songId, refetch }: { name: string, genreId: string, songId: string, refetch: () => void; }) {
    const {loading: songLoading, error: songError} = useQuery(
        GET_SONG,
        {variables: {id: songId}}
    );
    const {data: genresData, error: genresError} = useQuery(GET_GENRES);
    const [mutateFunction, {data, loading, error}] = useMutation(UPDATE_SONG);

    const formSong = useForm<{ name: string; genreId: string }>({
        defaultValues: {name: name, genreId: genreId},
    });

    if (songLoading) return <p>Chargement de la chanson…</p>;
    if (songError) return <p className="text-red-500">{songError.message}</p>;
    if (genresError)
        return <p className="text-red-500">{genresError.message}</p>;

    async function onSubmit(values: { name: string; genreId: string }) {
        try {
            await mutateFunction({
                variables: {
                    id: songId,
                    input: {name: values.name, genreId: values.genreId},
                },
            });
            refetch();
            formSong.reset();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mt-4 max-w-md">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Modifier</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier la chanson</DialogTitle>
                    </DialogHeader>
                    <Form {...formSong}>
                        <form onSubmit={formSong.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={formSong.control}
                                name="name"
                                rules={{
                                    required: "Il faut un nom",
                                    minLength: {value: 2, message: "Le nom doit comporter au moins 2 caractères"}
                                }}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nom de la chanson</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Onizuka" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formSong.control}
                                name="genreId"
                                rules={{required: "Il faut choisir un genre"}}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un genre"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genresData?.genres.map((genre) => (
                                                            <SelectItem key={genre.id} value={genre.id}>
                                                                {genre.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading}>
                                Enregistrer
                            </Button>
                            {error && <div className="text-red-500">{error.message}</div>}
                            {data && (
                                <div className={data.updateSong.success ? "text-green-500" : "text-red-500"}>
                                    {data.updateSong.success ? "Chanson modifiée" : "Modification échouée"}
                                </div>
                            )}
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
