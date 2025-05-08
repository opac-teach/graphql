/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment GenreFragment on Genre {\n\t\tid\n\t\tname\n\t}\n": typeof types.GenreFragmentFragmentDoc,
    "\n\tfragment GenreWithSongsCountFragment on Genre {\n\t\t...GenreFragment\n\t\tsongsCount\n\t}\n\t\n": typeof types.GenreWithSongsCountFragmentFragmentDoc,
    "\n\tfragment GenreCreationFragment on Genre {\n\t\t__typename\n\t\t...GenreFragment\n\t}\n\t\n": typeof types.GenreCreationFragmentFragmentDoc,
    "\n  fragment SongFragment on Song {\n\t\tid\n\t\tname\n\t}\n": typeof types.SongFragmentFragmentDoc,
    "\n\tfragment SongWithUserAndGenreFragment on Song {\n\t\t...SongFragment\n\t\tuser {\n\t\t\t...UserFragment\n\t\t}\n\t\tgenre {\n\t\t\t...GenreFragment\n\t\t}\n\t}\n\t\n\t\n\t\n": typeof types.SongWithUserAndGenreFragmentFragmentDoc,
    "\n  fragment SongCreationFragment on Song {\n    __typename\n    ...SongWithUserAndGenreFragment\n  }\n  \n": typeof types.SongCreationFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n\t\tid\n\t\tname\n\t}\n": typeof types.UserFragmentFragmentDoc,
    "\n\tfragment UserWithSongsCountFragment on User {\n\t\t...UserFragment\n\t\tsongsCount\n\t}\n\t\n": typeof types.UserWithSongsCountFragmentFragmentDoc,
    "\n\tfragment UserCreationFragment on User {\n\t__typename\n\t...UserFragment\n\t}\n\t\n": typeof types.UserCreationFragmentFragmentDoc,
    "\n  query Genre($id: ID!) {\n    genre(id: $id) {\n      ...GenreWithSongsCountFragment\n      songs {\n        ...SongFragment\n      }\n    }\n  }\n  \n  \n": typeof types.GenreDocument,
    "\n  query Genres {\n    genres {\n      ...GenreWithSongsCountFragment\n    }\n  }\n  \n": typeof types.GenresDocument,
    "\n  mutation CreateGenre($input: CreateGenreInput!) {\n    createGenre(input: $input) {\n      success\n      genre {\n        ...GenreFragment\n      }\n    }\n  }\n  \n": typeof types.CreateGenreDocument,
    "\n  query Song($id: ID!) {\n    song(id: $id) {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n": typeof types.SongDocument,
    "\n  query Songs {\n    songs {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n": typeof types.SongsDocument,
    "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n": typeof types.CreateSongDocument,
    "\n  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n    updateSong(id: $updateSongId, input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n": typeof types.UpdateSongDocument,
    "\n  mutation DeleteSong($deleteSongId: ID!) {\n    deleteSong(id: $deleteSongId) {\n      success\n    }\n  }\n": typeof types.DeleteSongDocument,
    "\n  query User($id: ID!) {\n    user(id: $id) {\n      ...UserWithSongsCountFragment\n      songs {\n        ...SongFragment\n        genre {\n          ...GenreFragment\n        }\n      }\n    }\n  }\n  \n  \n  \n": typeof types.UserDocument,
    "\n  query Users {\n    users {\n      ...UserWithSongsCountFragment\n    }\n  }\n  \n": typeof types.UsersDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        ...UserFragment\n      }\n    }\n  }\n  \n": typeof types.CreateUserDocument,
};
const documents: Documents = {
    "\n  fragment GenreFragment on Genre {\n\t\tid\n\t\tname\n\t}\n": types.GenreFragmentFragmentDoc,
    "\n\tfragment GenreWithSongsCountFragment on Genre {\n\t\t...GenreFragment\n\t\tsongsCount\n\t}\n\t\n": types.GenreWithSongsCountFragmentFragmentDoc,
    "\n\tfragment GenreCreationFragment on Genre {\n\t\t__typename\n\t\t...GenreFragment\n\t}\n\t\n": types.GenreCreationFragmentFragmentDoc,
    "\n  fragment SongFragment on Song {\n\t\tid\n\t\tname\n\t}\n": types.SongFragmentFragmentDoc,
    "\n\tfragment SongWithUserAndGenreFragment on Song {\n\t\t...SongFragment\n\t\tuser {\n\t\t\t...UserFragment\n\t\t}\n\t\tgenre {\n\t\t\t...GenreFragment\n\t\t}\n\t}\n\t\n\t\n\t\n": types.SongWithUserAndGenreFragmentFragmentDoc,
    "\n  fragment SongCreationFragment on Song {\n    __typename\n    ...SongWithUserAndGenreFragment\n  }\n  \n": types.SongCreationFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n\t\tid\n\t\tname\n\t}\n": types.UserFragmentFragmentDoc,
    "\n\tfragment UserWithSongsCountFragment on User {\n\t\t...UserFragment\n\t\tsongsCount\n\t}\n\t\n": types.UserWithSongsCountFragmentFragmentDoc,
    "\n\tfragment UserCreationFragment on User {\n\t__typename\n\t...UserFragment\n\t}\n\t\n": types.UserCreationFragmentFragmentDoc,
    "\n  query Genre($id: ID!) {\n    genre(id: $id) {\n      ...GenreWithSongsCountFragment\n      songs {\n        ...SongFragment\n      }\n    }\n  }\n  \n  \n": types.GenreDocument,
    "\n  query Genres {\n    genres {\n      ...GenreWithSongsCountFragment\n    }\n  }\n  \n": types.GenresDocument,
    "\n  mutation CreateGenre($input: CreateGenreInput!) {\n    createGenre(input: $input) {\n      success\n      genre {\n        ...GenreFragment\n      }\n    }\n  }\n  \n": types.CreateGenreDocument,
    "\n  query Song($id: ID!) {\n    song(id: $id) {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n": types.SongDocument,
    "\n  query Songs {\n    songs {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n": types.SongsDocument,
    "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n": types.CreateSongDocument,
    "\n  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n    updateSong(id: $updateSongId, input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n": types.UpdateSongDocument,
    "\n  mutation DeleteSong($deleteSongId: ID!) {\n    deleteSong(id: $deleteSongId) {\n      success\n    }\n  }\n": types.DeleteSongDocument,
    "\n  query User($id: ID!) {\n    user(id: $id) {\n      ...UserWithSongsCountFragment\n      songs {\n        ...SongFragment\n        genre {\n          ...GenreFragment\n        }\n      }\n    }\n  }\n  \n  \n  \n": types.UserDocument,
    "\n  query Users {\n    users {\n      ...UserWithSongsCountFragment\n    }\n  }\n  \n": types.UsersDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        ...UserFragment\n      }\n    }\n  }\n  \n": types.CreateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment GenreFragment on Genre {\n\t\tid\n\t\tname\n\t}\n"): (typeof documents)["\n  fragment GenreFragment on Genre {\n\t\tid\n\t\tname\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment GenreWithSongsCountFragment on Genre {\n\t\t...GenreFragment\n\t\tsongsCount\n\t}\n\t\n"): (typeof documents)["\n\tfragment GenreWithSongsCountFragment on Genre {\n\t\t...GenreFragment\n\t\tsongsCount\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment GenreCreationFragment on Genre {\n\t\t__typename\n\t\t...GenreFragment\n\t}\n\t\n"): (typeof documents)["\n\tfragment GenreCreationFragment on Genre {\n\t\t__typename\n\t\t...GenreFragment\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment SongFragment on Song {\n\t\tid\n\t\tname\n\t}\n"): (typeof documents)["\n  fragment SongFragment on Song {\n\t\tid\n\t\tname\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment SongWithUserAndGenreFragment on Song {\n\t\t...SongFragment\n\t\tuser {\n\t\t\t...UserFragment\n\t\t}\n\t\tgenre {\n\t\t\t...GenreFragment\n\t\t}\n\t}\n\t\n\t\n\t\n"): (typeof documents)["\n\tfragment SongWithUserAndGenreFragment on Song {\n\t\t...SongFragment\n\t\tuser {\n\t\t\t...UserFragment\n\t\t}\n\t\tgenre {\n\t\t\t...GenreFragment\n\t\t}\n\t}\n\t\n\t\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment SongCreationFragment on Song {\n    __typename\n    ...SongWithUserAndGenreFragment\n  }\n  \n"): (typeof documents)["\n  fragment SongCreationFragment on Song {\n    __typename\n    ...SongWithUserAndGenreFragment\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFragment on User {\n\t\tid\n\t\tname\n\t}\n"): (typeof documents)["\n  fragment UserFragment on User {\n\t\tid\n\t\tname\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment UserWithSongsCountFragment on User {\n\t\t...UserFragment\n\t\tsongsCount\n\t}\n\t\n"): (typeof documents)["\n\tfragment UserWithSongsCountFragment on User {\n\t\t...UserFragment\n\t\tsongsCount\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment UserCreationFragment on User {\n\t__typename\n\t...UserFragment\n\t}\n\t\n"): (typeof documents)["\n\tfragment UserCreationFragment on User {\n\t__typename\n\t...UserFragment\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Genre($id: ID!) {\n    genre(id: $id) {\n      ...GenreWithSongsCountFragment\n      songs {\n        ...SongFragment\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query Genre($id: ID!) {\n    genre(id: $id) {\n      ...GenreWithSongsCountFragment\n      songs {\n        ...SongFragment\n      }\n    }\n  }\n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Genres {\n    genres {\n      ...GenreWithSongsCountFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query Genres {\n    genres {\n      ...GenreWithSongsCountFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateGenre($input: CreateGenreInput!) {\n    createGenre(input: $input) {\n      success\n      genre {\n        ...GenreFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateGenre($input: CreateGenreInput!) {\n    createGenre(input: $input) {\n      success\n      genre {\n        ...GenreFragment\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Song($id: ID!) {\n    song(id: $id) {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query Song($id: ID!) {\n    song(id: $id) {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Songs {\n    songs {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query Songs {\n    songs {\n      ...SongWithUserAndGenreFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n    updateSong(id: $updateSongId, input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n    updateSong(id: $updateSongId, input: $input) {\n      success\n      song {\n        ...SongWithUserAndGenreFragment\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSong($deleteSongId: ID!) {\n    deleteSong(id: $deleteSongId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSong($deleteSongId: ID!) {\n    deleteSong(id: $deleteSongId) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: ID!) {\n    user(id: $id) {\n      ...UserWithSongsCountFragment\n      songs {\n        ...SongFragment\n        genre {\n          ...GenreFragment\n        }\n      }\n    }\n  }\n  \n  \n  \n"): (typeof documents)["\n  query User($id: ID!) {\n    user(id: $id) {\n      ...UserWithSongsCountFragment\n      songs {\n        ...SongFragment\n        genre {\n          ...GenreFragment\n        }\n      }\n    }\n  }\n  \n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      ...UserWithSongsCountFragment\n    }\n  }\n  \n"): (typeof documents)["\n  query Users {\n    users {\n      ...UserWithSongsCountFragment\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        ...UserFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        ...UserFragment\n      }\n    }\n  }\n  \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;