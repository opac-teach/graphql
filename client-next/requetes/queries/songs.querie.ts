import { gql } from "@/lib/graphql";

export const GET_SONGS = gql(`
  query Songs($genreId: String, $cursor: String, $limit: Float) {
    songs(genreId: $genreId, cursor: $cursor, limit: $limit) {
      items {
        id
        name
        author {
          id
          email
          name
        }
        genre {
          id
          name
        }
      }
      nextCursor
      hasMore
    }
  }
`);

export const GET_SONG = gql(`
  query Song($id: String!) {
    song(id: $id) {
      id
      name
      author {
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
