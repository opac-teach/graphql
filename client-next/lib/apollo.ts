"use client";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const userId = localStorage.getItem("user_id");

    return {
      headers: {
        ...headers,
        user_id: userId || "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}

export const getClient = createApolloClient;
