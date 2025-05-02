"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const GET_GENRES = gql(`
    query Genres {
        genres {
            id
            name
            songsCount
        }
    }
`);

export default function Genres() {
    const { data, loading, error } = useQuery(GET_GENRES);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Skeleton className="h-6 w-32 rounded-full" />
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
            <h1 className="text-3xl font-bold mb-6 text-center">Genres</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.genres.map((genre) => (
                    <Link key={genre.id} href={`/genres/${genre.id}`} className="block">
                        <Card className="border-2 border-black rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between">
                            <CardHeader className="p-0">
                                <CardTitle className="text-xl font-bold font-boldtext-lg text-black hover:underline">
                                    {genre.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0" />
                            <CardFooter className="p-0 flex justify-end">
                                <Badge className="text-sm">
                                    {genre.songsCount} chanson(s)
                                </Badge>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}