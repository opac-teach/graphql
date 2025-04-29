import { gql } from "@/lib/graphql";

export const GET_SONGS = gql(`
  query Songs($limit: Int, $offset: Int, $genreId: ID) {
  songs(limit: $limit, offset: $offset, genreId: $genreId) {
    id
    name
    user {
      id
      name
    }
    genre {
      id
      name
    }
  }
}
`);
