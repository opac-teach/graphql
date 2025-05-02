'use client';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { gql } from '@apollo/client';

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    mePlaylists {
      id
      name
      image
      url
    }
  }
`;

export default function Playlists() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_PLAYLISTS, {
    fetchPolicy: 'cache-first',
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  if (loading) return <p className="text-white p-4">Chargement...</p>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes playlists Spotify</h1>
      <div className="space-y-4">
        {data?.mePlaylists.map((playlist: any) => (
          <div
            key={playlist.id}
            onClick={() => router.push(`/playlist/${playlist.id}`)}
            className="flex items-center gap-4 bg-zinc-900 p-4 rounded hover:bg-zinc-800 cursor-pointer transition"
          >
            {playlist.image ? (
              <img src={playlist.image} alt={playlist.name} className="w-16 h-16 rounded shadow" />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded" />
            )}
            <div>
              <h2 className="text-lg font-semibold">{playlist.name}</h2>
              <p className="text-sm text-gray-400">Voir les morceaux</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
