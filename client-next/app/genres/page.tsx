"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Genre } from "@/lib/graphql/graphql";

const GET_GENRES = gql`
  query Genres($limit: Int!, $page: Int!) {
    genres(limit: $limit, page: $page) {
      id
      name
    }
  }
`;

export default function Users() {
  const { data, loading, error, refetch } = useQuery(GET_GENRES, {
    variables: {
      limit: 10,
      page: 1,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Genres</h1>
      <div>
        {data?.genres.map((genre: Genre) => (
          <div key={genre.id} className="flex gap-2">
            <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
