"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

// Query pour récupérer tous les genres
const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
      songsCount
    }
  }

`;

const GenrePage = () => {
  const { loading, error, data } = useQuery(GET_GENRES);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {data.genres.map((genre: { id: string; name: string ;songsCount: number }) => (
          <li key={genre.id}>
            <Link href={`/genre/${genre.id}`}>{genre.name}</Link>
            <p>{genre.songsCount} chansons</p>
          </li>
        ))}
      </ul>
    
        <Link href="/genre/create">
          <button style={{ padding: "8px 16px", backgroundColor: "blue", color: "white", borderRadius: "4px" }}>
            ➕ Créer un genre
          </button>
        </Link>
      
    </div>
  );
};

export default GenrePage;
