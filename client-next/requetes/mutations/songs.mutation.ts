import { gql } from "@/lib/graphql";

export const CREATE_SONG = gql(`
  mutation CreateSong($createSongInput: CreateSongInput!) {
    createSong(createSongInput: $createSongInput) {
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

export const UPDATE_SONG = gql(`
  mutation UpdateSong($updateSongInput: UpdateSongInput!) {
    updateSong(updateSongInput: $updateSongInput) {
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

export const DELETE_SONG = gql(`
  mutation DeleteSong($id: String!) {
    removeSong(id: $id) {
      success
      id
    }
  }
`);
