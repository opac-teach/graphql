import { gql } from "@/lib/graphql";

export const GET_GENRES = gql(`
  query Genres {
  genres {
    id
    name
    songs {
      id
      name
      author {
        id
        email
        name
      }
    }
  }
}
`);

export const GET_GENRE = gql(`
  query Genre($id: String!) {
    genre(id: $id) {
      id
      name
      songs {
        id
        name
        author {
          id
          name
        }
      }
    }
  }
`);
