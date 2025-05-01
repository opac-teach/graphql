import { gql } from "@/lib/graphql";

export const GET_SONGS = gql(`
  query Songs($genreId: String) {
    songs(genreId: $genreId) {
      authorId
      id
      name
      author {
        email
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
