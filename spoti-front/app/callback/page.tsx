'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';

const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($code: String!, $codeVerifier: String!) {
    authenticate(code: $code, codeVerifier: $codeVerifier)
  }
`;

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authenticate] = useMutation(AUTHENTICATE_MUTATION, {
    fetchPolicy: 'no-cache',
  });

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get('code');
      const codeVerifier = getCookie('code_verifier');
  
      if (!code || !codeVerifier) {
        console.warn('Code ou code_verifier manquant');
        return;
      }
  
      try {
        const { data } = await authenticate({
          variables: { code, codeVerifier },
          context: {
            fetchOptions: {
              credentials: 'include',
            },
          },
        });
  
        const jwt = data.authenticate;
  
        Cookies.set('jwt', jwt, {
          expires: 1,
          path: '/',
          secure: false,
          sameSite: 'lax',
        });
  
        localStorage.setItem('is_authenticated', 'true');
        router.push('/');
      } catch (error: any) {
        console.error('Erreur auth :', error.message);
      }
    };
  
    handleAuth();
  }, [searchParams]);
  

  return <p>Connexion à Spotify en cours...</p>;
}
