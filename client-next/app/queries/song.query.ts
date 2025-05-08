import { gql } from "@apollo/client";
import { SONG_WITH_USER_AND_GENRE_FRAGMENT } from "../fragments/song.fragment";

export const GET_SONG = gql`
  query Song($id: ID!) {
    song(id: $id) {
      ...SongWithUserAndGenreFragment
    }
  }
  ${SONG_WITH_USER_AND_GENRE_FRAGMENT}
`;

export const GET_SONGS = gql`
  query Songs {
    songs {
      ...SongWithUserAndGenreFragment
    }
  }
  ${SONG_WITH_USER_AND_GENRE_FRAGMENT}
`;

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      success
      song {
        ...SongWithUserAndGenreFragment
      }
    }
  }
  ${SONG_WITH_USER_AND_GENRE_FRAGMENT}
`;

export const UPDATE_SONG = gql`
  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {
    updateSong(id: $updateSongId, input: $input) {
      success
      song {
        ...SongWithUserAndGenreFragment
      }
    }
  }
  ${SONG_WITH_USER_AND_GENRE_FRAGMENT}
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($deleteSongId: ID!) {
    deleteSong(id: $deleteSongId) {
      success
    }
  }
`;