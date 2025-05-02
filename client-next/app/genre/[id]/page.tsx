"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

// Query pour récupérer un genre par son ID
const GET_GENRE = gql`
  query GetGenre($id: ID!) {
    genre(id: $id) {
      id
      name
      songs {
        id
        name
      }
    }
  }
`;

const GenreDetailPage = () => {
const { id } = useParams();

  const { loading, error, data } = useQuery(GET_GENRE, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const genre = data.genre;

  return (
    <div>
      <h1>Genre: {genre.name}</h1>
      <h2>Songs in this genre:</h2>
      <ul>
        {genre.songs.map((song: { id: string; name: string }) => (
          <li key={song.id}>
            <Link href={`/songs/${song.id}`}>{song.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreDetailPage;
