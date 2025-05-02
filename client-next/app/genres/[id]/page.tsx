"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";

const GET_SONGINFO = gql(`
query Genre($genreId: ID!) {
  genre(id: $genreId) {
    id
    name
    songsCount
    songs {
      id
      name
    }
  }
}
`);

export default function GenreIdPage(){
    const { id } = useParams<{ id: string }>();
  
    const { data, loading, error } = useQuery(GET_SONGINFO, {
        variables: {
            genreId: id,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (!data || error) return <p>Informations vide</p>;


    return (
        <div>
            <h1>{data.genre.name}</h1>
            <p>TOTAL : {data.genre.songsCount}</p>
            <div>
              <p>Song :</p>
              <div>
              {data?.genre.songs.map((song : any) => (
                <div key={song.id} className="flex gap-2">
                    <div className="flex">
                    <Link href={`/songs/${song.id}`}>{song.name}</Link>
                    </div>
                </div>
                ))}
              </div>
            </div>
        </div>
    );
}