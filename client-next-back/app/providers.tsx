"use client";

import { createApolloClient } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";

const apolloClient = createApolloClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
