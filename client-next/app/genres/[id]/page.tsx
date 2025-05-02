"use client";

import { gql } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

const GET_GENRE = gql(`
    query GetGenre($id: ID!) {
        genre(id: $id) {
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

export default function GenrePage() {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useQuery(GET_GENRE, {
        variables: { id },
    });

    console.log("genre id:", id);
    console.log("GraphQL data:", data);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data?.genre) return <p>Genre introuvable</p>;

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold">{data.genre.name}</h1>
        <h2 className="mt-4 text-xl">Chansons</h2>
        <ul className="mt-2 space-y-2">
            {data.genre.songs.map((song) => (
            <li key={song.id}>
                <Link href={`/songs/${song.id}`} className="text-blue-600 underline">
                {song.name}
                </Link>{" "}
                <span className="text-sm text-gray-600">
                par{" "}
                <Link href={`/users/${song.user.id}`} className="text-blue-600 underline">
                    {song.user.name}
                </Link>
                </span>
            </li>
            ))}
        </ul>
        </div>
    );
}
