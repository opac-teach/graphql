"use client"
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { gql } from "@/lib/graphql";
import { useParams } from "next/navigation";


const GET_GENRE = gql(`
  query Genre($id: ID!) {
    genre(id: $id) {
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
      songCount
    }
  }
`);

export default function Genre() {
  const { id } = useParams<{id: string}>();
  const { data, loading, error } = useQuery(GET_GENRE, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
<div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Genre</h1>
  <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">{data?.genre.name}</h2>
  <div className="text-center mb-8">
    <p className="text-lg text-gray-700">Song Count: {data?.genre.songCount}</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data?.genre.songs.map((song) => (
      <div
        key={song.id}
        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <Link
          href={`/songs/${song.id}`}
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          {song.name}
        </Link>
      </div>
    ))}
  </div>
</div>
  );
}