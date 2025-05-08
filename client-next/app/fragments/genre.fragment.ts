import { gql } from "@apollo/client";

export const GENRE_FRAGMENT = gql`
  fragment GenreFragment on Genre {
		id
		name
	}
`;

export const GENRE_WITH_SONGS_COUNT_FRAGMENT = gql`
	fragment GenreWithSongsCountFragment on Genre {
		...GenreFragment
		songsCount
	}
	${GENRE_FRAGMENT}
`;

export const GENRE_CREATION_FRAGMENT = gql`
	fragment GenreCreationFragment on Genre {
		__typename
		...GenreFragment
	}
	${GENRE_FRAGMENT}
`