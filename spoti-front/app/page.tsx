'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const SEARCH_SPOTIFY = gql`
  query SearchSpotify($query: String!) {
    searchSpotify(query: $query) {
      tracks {
        id
        name
        artists
      }
      albums {
        id
        name
        artists
      }
      artists {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const { data, loading, error } = useQuery(SEARCH_SPOTIFY, {
    variables: { query: submittedQuery },
    skip: !submittedQuery,
    fetchPolicy: 'no-cache',
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  const handleSearch = () => {
    if (query.trim()) {
      setSubmittedQuery(query.trim());
    }
  };

  const results = data?.searchSpotify ?? { tracks: [], albums: [], artists: [] };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un artiste, titre ou album"
        className="w-full p-3 mb-6 rounded bg-gray-900 text-white focus:outline-none"
      />
      <button onClick={handleSearch} className="mb-10 px-4 py-2 bg-green-500 text-black rounded">
        Rechercher
      </button>
      <h2>CETTE REQUETE NE MARCHE PAS</h2>

      {loading && <p className="text-white">Chargement...</p>}
      {error && <p className="text-red-500">Erreur : {error.message}</p>}

      {!loading && data && (
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-2">Titres</h2>
            {results.tracks.map((t: any) => (
              <div key={t.id} className="mb-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-400">{t.artists.join(', ')}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Albums</h2>
            {results.albums.map((a: any) => (
              <div key={a.id} className="mb-4">
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-400">{a.artists.join(', ')}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Artistes</h2>
            {results.artists.map((ar: any) => (
              <div key={ar.id} className="mb-4">
                <p className="font-semibold">{ar.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
