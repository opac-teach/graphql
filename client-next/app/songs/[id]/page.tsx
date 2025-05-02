"use client";

import {useQuery} from "@apollo/client";
import Link from "next/link";
import {useParams} from "next/navigation";
import {gql} from "@/lib/graphql";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import {Separator} from "@/components/ui/separator";
import UpdateSongForm from "@/app/songs/updateSongForm";
import DeleteSongButton from "@/app/songs/deleteSongButton";


const GET_SONG_DETAILS = gql(`
    query SongDetail($id: ID!) {
        songById(id: $id) {
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
`);

export default function SongDetails() {
    const {id} = useParams<{ id: string }>();
    const {data, loading, error, refetch} = useQuery(GET_SONG_DETAILS, {variables: {id}});

    if (loading || !data) {
        return (
            <div className="flex justify-center py-16">
                <Skeleton className="h-6 w-48 rounded-full"/>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-16">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        );
    }
    const song = data?.songById;
    if (song) {
        return (
            <div className="flex justify-center py-12 px-4">
                <Card className="w-full max-w-lg border-2 border-black rounded-lg shadow-lg">
                    <CardHeader className="border-b border-black pb-4 px-4">
                        <Link href={`/songs/${song.id}`} className="text-3xl font-bold text-black">
                            {song.name}
                        </Link>
                    </CardHeader>
                    <CardContent className="p-4 space-y-6">
                        <div className="inline-flex space-y-1 gap-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      Créé par :
                    </span>
                            <Link href={`/users/${song.user.id}`} className="text-base font-medium text-black">
                                {song.user.name}
                            </Link>
                        </div>
                        <Separator/>
                        <div className="inline-flex space-y-1 gap-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      Genre :
                    </span>
                            <Link href={`/genres/${song.genre.id}`} className="text-base font-medium text-black ">
                                {song.genre.name}
                            </Link>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between px-4 pb-4 pt-2">
                        <UpdateSongForm name="" genreId={song.genre.id} songId={song.id} refetch={refetch}/>
                        <DeleteSongButton songId={song.id}></DeleteSongButton>
                        <Link href="/songs" className="text-sm text-black hover:underline">
                            ← Retour aux chansons
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}