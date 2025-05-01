"use client";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return client;
}
