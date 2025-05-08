import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./user.fragment";
import { GENRE_FRAGMENT } from "./genre.fragment";

export const SONG_FRAGMENT = gql`
  fragment SongFragment on Song {
		id
		name
	}
`;

export const SONG_WITH_USER_AND_GENRE_FRAGMENT = gql`
	fragment SongWithUserAndGenreFragment on Song {
		...SongFragment
		user {
			...UserFragment
		}
		genre {
			...GenreFragment
		}
	}
	${SONG_FRAGMENT}
	${USER_FRAGMENT}
	${GENRE_FRAGMENT}
`;

export const SONG_CREATION_FRAGMENT = gql`
  fragment SongCreationFragment on Song {
    __typename
    ...SongWithUserAndGenreFragment
  }
  ${SONG_WITH_USER_AND_GENRE_FRAGMENT}
`;
