"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import CreateSongForm from "./createSongForm";

const GET_SONGS = gql(`
    query Songs {
        songs {
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

export default function Songs() {
    const { data, loading, error, refetch } = useQuery(GET_SONGS, {fetchPolicy: "cache-and-network"});

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Skeleton className="h-4 w-32 rounded-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="px-4 py-6">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Liste des chansons
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.songs.map((song) => (
                    <Card key={song.id} className="w-80 h-40 border-2 border-black rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <CardHeader className="p-0">
                            <Link href={`/songs/${song.id}`} className="text-xl font-bold text-black">
                                {song.name}
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0 text-base text-gray-700"> Par{" "}
                            <Link href={`/users/${song.user.id}`} className="font-medium text-black text-base">
                                {song.user.name}
                            </Link>
                        </CardContent>
                        <CardFooter className="p-0 flex justify-end">
                            <Link href={`/genres/${song.genre.id}`} className="text-smbg-gray-100px-3 py-1rounded-full">
                                {song.genre.name}
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-8 max-w-md">
                <CreateSongForm refetch={refetch}/>
            </div>

        </div>
    );
}