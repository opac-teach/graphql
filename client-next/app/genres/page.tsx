"use client";

import { gql } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateGenreForm from "./CreateGenreForm"

const GET_GENRES = gql(`
    query GetGenres {
        genres {
            id
            name
            songsCount
        }
    }
`);

export default function GenresPage() {
    const { data, loading, error, refetch } = useQuery(GET_GENRES);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

        console.log("GraphQL data:", data);

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold">Genres</h1>
        <CreateGenreForm refetch={refetch}/> 
        <ul className="mt-4 space-y-2">
        {data?.genres?.map((genre: any) => (
            <li key={genre.id} className="flex items-center justify-between">
                <Link href={`/genres/${genre.id}`} className="text-blue-600 underline">
                {genre.name}
                </Link>
                <span className="text-sm text-gray-600">{genre.songsCount} chansons</span>
            </li>
            ))}
        </ul>
        </div>
    );
}
