import { gql } from "@apollo/client";
import { GENRE_FRAGMENT } from "../fragments/genre.fragment";
import { SONG_FRAGMENT } from "../fragments/song.fragment";
import { USER_FRAGMENT, USER_WITH_SONGS_COUNT_FRAGMENT } from "../fragments/user.fragment";

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      ...UserWithSongsCountFragment
      songs {
        ...SongFragment
        genre {
          ...GenreFragment
        }
      }
    }
  }
  ${USER_WITH_SONGS_COUNT_FRAGMENT}
  ${SONG_FRAGMENT}
  ${GENRE_FRAGMENT}
`;

export const GET_USERS = gql`
  query Users {
    users {
      ...UserWithSongsCountFragment
    }
  }
  ${USER_WITH_SONGS_COUNT_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;