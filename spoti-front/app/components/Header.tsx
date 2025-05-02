'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

const ME_PROFIL = gql`
  query MeProfil {
    meProfil {
      displayName
      image
    }
  }
`;

export default function Header() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME_PROFIL, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  const isAuthenticated = !!data?.meProfil;
  const name = data?.meProfil?.displayName || '';
  const profileImage = data?.meProfil?.image || '';

  const handleLogin = () => {
    router.push('/login');
  };

  const handlePlaylist = () => {
    router.push('/playlist')
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10">
      <h1 className="text-xl font-bold">SpotiGraph</h1>
      <div>
        {loading ? null : isAuthenticated ? (
          profileImage ? (
            <div>
                <button
                    onClick={handlePlaylist}
                    className="px-4 py-2 bg-white text-black font-semibold rounded"
                >
                    Mes playlists
                </button>
                <Image
                    src={profileImage}
                    alt={name}
                    width={36}
                    height={36}
                    className="rounded-full"
                />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/20" />
          )
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-white text-black font-semibold rounded"
          >
            Se connecter
          </button>
        )}
      </div>
    </header>
  );
}
