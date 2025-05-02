"use client";

import { gql } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import UpdateSongForm from "../UpdateSongForm";
import DeleteSongForm from "../DeleteSongForm";

const GET_SONG = gql(`
    query GetSong($id: ID!) {
        song(id: $id) {
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

export default function SongPage() {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error, refetch } = useQuery(GET_SONG, {
        variables: { id },
    });

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data?.song) return <p>Chanson introuvable</p>;

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold">{data.song.name}</h1>
        <p className="mt-2">
            Créée par :{" "}
            <Link href={`/users/${data.song.user.id}`} className="text-blue-600 underline">
            {data.song.user.name}
            </Link>
        </p>
        <p className="mt-2">
            Genre :{" "}
            <Link href={`/genres/${data.song.genre.id}`} className="text-purple-600 underline">
            {data.song.genre.name}
            </Link>
        </p>
        <UpdateSongForm song={data.song} refetch={refetch}/>
        <DeleteSongForm songId={data.song.id} refetch={refetch} />
        </div>
    );
}
