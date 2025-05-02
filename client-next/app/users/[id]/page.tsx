"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const GET_USER = gql(`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      songs {
        id
        name
        genre {
           id 
           name
        }  
      }
    }
  }
`);

function loginAs(userId: string) {
  localStorage.setItem("user_id", userId);
  window.location.reload();
}

export default function User() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useQuery(GET_USER, { variables: { id } });

    if (loading || !data) {
        return (
            <div className="flex justify-center py-16">
                <Skeleton className="h-6 w-48 rounded-full" />
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

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-center">{data?.user.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.user.songs.map((song) => (
                    <Card key={song.id} className="border-2 border-black rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b border-black pb-3 px-4">
                            <Link href={`/songs/${song.id}`} className="text-xl font-bold text-black hover:underline">
                                {song.name}
                            </Link>
                        </CardHeader>
                        <CardContent className="p-4 text-base text-gray-700">
                            Genre :{" "}
                            <Link href={`/genres/${song.genre.id}`} className="font-medium text-black hover:underline">
                                {song.genre.name}
                            </Link>
                        </CardContent>
                        <CardFooter className="px-4 pb-4 pt-2 flex justify-between">
                            <Link href={`/songs/${song.id}`} className="text-sm font-medium text-black hover:underline">
                                Voir détails →
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-center items-center gap-16">
                <Button size="sm" onClick={() => loginAs(data.user.id)}>
                    Login as {data.user.name}
                </Button>
                <Link href="/users" className="text-sm font-medium text-black hover:underline">
                    ← Retour aux utilisateurs
                </Link>
            </div>
        </div>
    );
}
