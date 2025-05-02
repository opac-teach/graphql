"use client";

import gql from "graphql-tag";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const GET_GENRE_ID = gql(`
    query Genre($genreId: ID!) {
      genre(id: $genreId) {
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
`)

export default function GenreID() {
    const { id } = useParams<{ id: string }>()

    const { data, loading, error } = useQuery(GET_GENRE_ID, {
        variables: {
            genreId: id
        }
    })

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Genre</h1>
            <h3>{data?.genre?.name}</h3>
            <h2>Songs</h2>
            <div>
                {data?.genre.songs.map((song) => (
                    <div key={song.id} className="flex gap-2">
                        <Link href={`/songs/${song.id}`}>{song.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}