"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateGenreForm from "./CreateGenreForm";



const GET_GENRES = gql(`
  query Genres {
    genres {
      id
      name
      songCount
      songs {
        id
        name
      }
    }
  }
`);


export default function User() {
  const { data, loading, error, refetch } = useQuery(GET_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genres</h1>
      <div>
        {data?.genres.map((g) => (
          <div key={g.id} className="flex gap-2">
            <Link href={`/genres/${g.id}`}>{g.name} nombre de chansons {g.songCount}</Link>
            <div className="flex gap-2">
              {g.songs?.map((s) => (
                <Link key={s?.id} href={`/songs/${s?.id}`}>
                  {s?.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <CreateGenreForm refetch={refetch} />
    </div>
  );
}
