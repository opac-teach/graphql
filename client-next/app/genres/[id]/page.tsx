"use client";

import {useQuery} from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";
import {useParams} from "next/navigation";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";


const GET_GENRE_DETAILS = gql(`
    query Genre($id: ID!) {
        genreById(id: $id) {
            id
            name
            songs {
                id
                name
                user {
                    id
                    name
                }
            }
        }
    }
`);

export default function GenreDetails() {
    const {id} = useParams<{ id: string }>();
    const {data, loading, error} = useQuery(GET_GENRE_DETAILS, {
        variables: {id},
    });

    if (loading) {
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

    const genre = data?.genreById;

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-center">{genre?.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {genre?.songs?.map((song) => (
                    <Card key={song.id}
                          className="border-2 border-black rounded-lgshadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b border-black pb-3 px-4">
                            <Link href={`/songs/${song.id}`} className="text-xl font-bold text-black">
                                {song.name}
                            </Link>
                        </CardHeader>
                        <CardContent className="p-4 text-base text-gray-700">
                            Par{" "}
                            <Link
                                href={`/users/${song.user.id}`}
                                className="font-medium text-black hover:underline"
                            >
                                {song.user.name}
                            </Link>
                        </CardContent>

                        <CardFooter className="px-4 pb-4 pt-2">
                            <Link
                                href={`/songs/${song.id}`}
                                className="text-sm font-medium text-black hover:underline"
                            >
                                Voir détails →
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}