"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import { DocumentNode } from "graphql";
import CreateGenreForm from "./CreateGenreForm";

const GET_ALL_GENRES = gql(`
  query Genres {
    genres {
      id
      name
      songsCount
      songs(limit: 20, offset: 0) {
        id
        name
      }
    }
  }
`);

export default function Genres() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Genres musicaux</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.genres.map((genre) => (
          <div
            key={genre.id}
            className="border rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
          >
            <Link
              href={`/genre/${genre.id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {genre.name}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {genre.songsCount} chanson{genre.songsCount > 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <CreateGenreForm refetch={refetch} />
      </div>
    </div>
  );
}
