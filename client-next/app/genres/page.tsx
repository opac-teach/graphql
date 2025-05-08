"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import CreateGenreForm from "./CreateGenreForm";
import { Genre } from "@/lib/graphql/graphql";
import { GET_GENRES } from "../queries/genre.query";

export default function Genres() {
  const { data, loading, error } = useQuery(GET_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genres</h1>
      <div>
        {data?.genres.map((genre: Genre) => (
          <div key={genre.id} className="flex gap-2">
            <div className="flex gap-1">
              <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
              <span>
                (Number of songs : {genre.songsCount})
              </span>
            </div>
          </div>
        ))}
      </div>
      <CreateGenreForm />
    </div>
  );
}
