    "use client";
    
    import { useQuery } from "@apollo/client";
    import Link from "next/link";
    import { useParams } from "next/navigation";
    import { gql } from "@/lib/graphql";
    
    const GET_GENRE = gql(`
      query Genre($id: ID!) {
        genre(id: $id) {
          id
          name
          songs {
            id
            name
          }
          songCount
        }
      }
    `);

    
    export default function User() {
      const { id } = useParams<{ id: string }>();
    
      const { data, loading, error } = useQuery(GET_GENRE, {
        variables: {
          id,
        },
      });
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
    
      return (
        <div>
          <h1>Genre</h1>
          <h3>{data?.genre.name}</h3>
          <p>Nombre de chansons: {data?.genre.songCount}</p>
          <h2>Songs</h2>
          <div>
            {data?.genre.songs?.map((song) => (
              <div key={song?.id} className="flex gap-2">
                <Link href={`/songs/${song?.id}`}>{song?.name}</Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    