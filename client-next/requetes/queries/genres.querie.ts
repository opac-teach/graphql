import { gql } from "@/lib/graphql";

export const GET_GENRES = gql(`
  query Genres {
  genres {
    id
    name
  }
}
`);
