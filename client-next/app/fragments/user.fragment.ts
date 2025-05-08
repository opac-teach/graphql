import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
		id
		name
	}
`;

export const USER_WITH_SONGS_COUNT_FRAGMENT = gql`
	fragment UserWithSongsCountFragment on User {
		...UserFragment
		songsCount
	}
	${USER_FRAGMENT}
`;

export const USER_CREATION_FRAGMENT = gql`
	fragment UserCreationFragment on User {
	__typename
	...UserFragment
	}
	${USER_FRAGMENT}
`;
