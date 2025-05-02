"use client"

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import CreateGenreForm from "@/app/genres/CreateGenreForm";

const GET_GENRES = gql(`
  query Genres {
    genres {
      id
      name
    }
  }
`);

export default function Genre() {

  const { data, loading, error, refetch } = useQuery(GET_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
<div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Genres</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data?.genres.map((genre) => (
      <div
        key={genre.id}
        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <Link
          href={`/genres/${genre.id}`}
          className="text-xl font-semibold text-blue-600 hover:underline"
        >
          {genre.name}
        </Link>
      </div>
    ))}
  </div>
  <CreateGenreForm refetch={refetch}/>
</div>
  );
}