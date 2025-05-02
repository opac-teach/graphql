import { gql } from "@/lib/graphql";

export const CREATE_GENRE = gql(`
  mutation CreateGenre($createGenreInput: CreateGenreInput!) {
    createGenre(createGenreInput: $createGenreInput) {
      id
      name
    }
  }
`);

export const UPDATE_GENRE = gql(`
  mutation UpdateGenre($updateGenreInput: UpdateGenreInput!) {
    updateGenre(updateGenreInput: $updateGenreInput) {
      id
      name
    }
  }
`);

export const DELETE_GENRE = gql(`
  mutation DeleteGenre($id: String!) {
    removeGenre(id: $id) {
      success
      id
    }
  }
`);
