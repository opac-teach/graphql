"use client";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  const client = new ApolloClient({
    link: httpLink,
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            songs: {
              keyArgs: ["genreId"],
              merge(existing = { items: [] }, incoming, { args }) {
                if (!args?.cursor) {
                  return incoming;
                }

                return {
                  ...incoming,
                  items: [...(existing.items || []), ...incoming.items],
                };
              },
            },
          },
        },
      },
    }),
  });

  return client;
}
