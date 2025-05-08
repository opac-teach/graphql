import { gql } from "@apollo/client";
import { GENRE_FRAGMENT, GENRE_WITH_SONGS_COUNT_FRAGMENT } from "../fragments/genre.fragment";
import { SONG_FRAGMENT } from "../fragments/song.fragment";

export const GET_GENRE = gql`
  query Genre($id: ID!) {
    genre(id: $id) {
      ...GenreWithSongsCountFragment
      songs {
        ...SongFragment
      }
    }
  }
  ${GENRE_WITH_SONGS_COUNT_FRAGMENT}
  ${SONG_FRAGMENT}
`;

export const GET_GENRES = gql`
  query Genres {
    genres {
      ...GenreWithSongsCountFragment
    }
  }
  ${GENRE_WITH_SONGS_COUNT_FRAGMENT}
`;

export const CREATE_GENRE = gql`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      success
      genre {
        ...GenreFragment
      }
    }
  }
  ${GENRE_FRAGMENT}
`;
