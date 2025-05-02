'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/app/lib/apollo-client';
import React from 'react';

export default function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}