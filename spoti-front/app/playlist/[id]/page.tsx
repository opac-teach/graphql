'use client';

import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { gql } from '@apollo/client';

export const GET_PLAYLIST_TRACKS = gql`
  query PlaylistTracks($playlistId: String!) {
    playlistTracks(playlistId: $playlistId) {
      name
      artist
      album
      previewUrl
      albumImage
    }
    mePlaylists {
      id
      name
      image
    }
  }
`;

export default function PlaylistDetail() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PLAYLIST_TRACKS, {
    variables: { playlistId: id },
    fetchPolicy: 'cache-first',
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  if (loading) return <p className="text-white p-4">Chargement...</p>;

  const playlist = data.mePlaylists.find((p: any) => p.id === id);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button onClick={() => router.push('/playlist')} className="mb-6 flex items-center gap-2 text-sm hover:underline">
        <ArrowLeft size={20} />
        Retour aux playlists
      </button>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        {playlist?.image && (
          <img src={playlist.image} alt={playlist.name} className="w-40 h-40 rounded shadow-lg" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{playlist?.name}</h1>
          <p className="text-gray-400 mt-1">
            {data.playlistTracks.length} morceau{data.playlistTracks.length > 1 ? 'x' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {data.playlistTracks.map((track: any, i: number) => (
          <div key={i} className="flex items-center gap-4 border-b border-gray-700 pb-4">
            {track.albumImage ? (
              <img src={track.albumImage} alt="album cover" className="w-16 h-16 rounded" />
            ) : (
              <div className="w-16 h-16 bg-gray-800 rounded" />
            )}
            <div>
              <h2 className="text-lg font-semibold">{track.name}</h2>
              <p className="text-sm text-gray-400">
                {track.artist} — {track.album}
              </p>
              {track.previewUrl && (
                <audio controls className="mt-1 w-64">
                  <source src={track.previewUrl} type="audio/mpeg" />
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
