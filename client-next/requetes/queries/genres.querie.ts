import { gql } from "@/lib/graphql";

export const GET_GENRES = gql(`
  query Genres {
  genres {
    id
    name
  }
}
`);

export const GET_GENRE = gql(`
  query Genre($id: ID!) {
  genre(id: $id) {
    id
    name
    songsCount
    songs {
      id
      name
      user {
        id
        name
      }
    }
  }
}
`);
