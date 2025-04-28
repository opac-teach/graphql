"use client";

import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import Link from "next/link";

const GET_GENRES = gql(`
    query Genres {
      genres {
        id
        name
      }
    }
`)

export default function Genres() {
    const { data, loading, error } = useQuery(GET_GENRES)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Genres</h1>
            <div className="mt-10">
                {data?.genres.map((genre) => (
                    <div key={genre.id} className="flex gap-2">
                        <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
                    </div>
                ))}
            </div>

        </div>
    );
}