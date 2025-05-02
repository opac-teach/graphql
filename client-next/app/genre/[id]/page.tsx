"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gql } from "@/lib/graphql";

const GET_GENRES = gql(`
  query GenresId($id: ID!) {
    genre(id: $id) {
      id
      name
    }
  }
`);
export default function Genres() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_GENRES, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User</h1>
      <h3>{data?.genre.name}</h3>
      <h3>{data?.genre.id}</h3>
    </div>
  );
}
