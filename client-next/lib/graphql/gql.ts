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
    "\nmutation Mutation($input: CreateGenreInput!) {\n  createGenre(input: $input) {\n    success\n    genre {\n      name\n      id\n    }\n  }\n}\n": typeof types.MutationDocument,
    "\nquery Genre($genreId: ID!) {\n  genre(id: $genreId) {\n    id\n    name\n    songsCount\n    songs {\n      id\n      name\n    }\n  }\n}\n": typeof types.GenreDocument,
    "\n    query Genres {\n        genres {\n            id\n            name\n            songsCount\n        }\n    }\n": typeof types.GenresDocument,
    "\n  query GenresCreateSong {\n    genres {\n      id\n      name\n    }\n  }\n": typeof types.GenresCreateSongDocument,
    "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateSongDocument,
    "\n  mutation DeleteSong($id: ID!) {\n    deleteSong(id: $id) {\n      success\n    }\n  }\n": typeof types.DeleteSongDocument,
    "\n  query GenresUpdateSong {\n    genres {\n      id\n      name\n    }\n  }\n": typeof types.GenresUpdateSongDocument,
    "\nmutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n  updateSong(id: $updateSongId, input: $input) {\n    success\n  }\n}\n": typeof types.UpdateSongDocument,
    "\n  query Song($songId: ID!) {\n    song(id: $songId) {\n      id\n      name\n      user {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": typeof types.SongDocument,
    "\n  query Songs {\n    songs {\n      id\n      name\n      user {\n        id\n        name\n        }\n    }\n  }\n": typeof types.SongsDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query User($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserDocument,
    "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n": typeof types.UsersDocument,
};
const documents: Documents = {
    "\nmutation Mutation($input: CreateGenreInput!) {\n  createGenre(input: $input) {\n    success\n    genre {\n      name\n      id\n    }\n  }\n}\n": types.MutationDocument,
    "\nquery Genre($genreId: ID!) {\n  genre(id: $genreId) {\n    id\n    name\n    songsCount\n    songs {\n      id\n      name\n    }\n  }\n}\n": types.GenreDocument,
    "\n    query Genres {\n        genres {\n            id\n            name\n            songsCount\n        }\n    }\n": types.GenresDocument,
    "\n  query GenresCreateSong {\n    genres {\n      id\n      name\n    }\n  }\n": types.GenresCreateSongDocument,
    "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        id\n        name\n      }\n    }\n  }\n": types.CreateSongDocument,
    "\n  mutation DeleteSong($id: ID!) {\n    deleteSong(id: $id) {\n      success\n    }\n  }\n": types.DeleteSongDocument,
    "\n  query GenresUpdateSong {\n    genres {\n      id\n      name\n    }\n  }\n": types.GenresUpdateSongDocument,
    "\nmutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n  updateSong(id: $updateSongId, input: $input) {\n    success\n  }\n}\n": types.UpdateSongDocument,
    "\n  query Song($songId: ID!) {\n    song(id: $songId) {\n      id\n      name\n      user {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": types.SongDocument,
    "\n  query Songs {\n    songs {\n      id\n      name\n      user {\n        id\n        name\n        }\n    }\n  }\n": types.SongsDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        id\n        name\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  query User($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n": types.UserDocument,
    "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n": types.UsersDocument,
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
export function gql(source: "\nmutation Mutation($input: CreateGenreInput!) {\n  createGenre(input: $input) {\n    success\n    genre {\n      name\n      id\n    }\n  }\n}\n"): (typeof documents)["\nmutation Mutation($input: CreateGenreInput!) {\n  createGenre(input: $input) {\n    success\n    genre {\n      name\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Genre($genreId: ID!) {\n  genre(id: $genreId) {\n    id\n    name\n    songsCount\n    songs {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery Genre($genreId: ID!) {\n  genre(id: $genreId) {\n    id\n    name\n    songsCount\n    songs {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Genres {\n        genres {\n            id\n            name\n            songsCount\n        }\n    }\n"): (typeof documents)["\n    query Genres {\n        genres {\n            id\n            name\n            songsCount\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GenresCreateSong {\n    genres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GenresCreateSong {\n    genres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSong($input: CreateSongInput!) {\n    createSong(input: $input) {\n      success\n      song {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSong($id: ID!) {\n    deleteSong(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSong($id: ID!) {\n    deleteSong(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GenresUpdateSong {\n    genres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GenresUpdateSong {\n    genres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n  updateSong(id: $updateSongId, input: $input) {\n    success\n  }\n}\n"): (typeof documents)["\nmutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {\n  updateSong(id: $updateSongId, input: $input) {\n    success\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Song($songId: ID!) {\n    song(id: $songId) {\n      id\n      name\n      user {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Song($songId: ID!) {\n    song(id: $songId) {\n      id\n      name\n      user {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Songs {\n    songs {\n      id\n      name\n      user {\n        id\n        name\n        }\n    }\n  }\n"): (typeof documents)["\n  query Songs {\n    songs {\n      id\n      name\n      user {\n        id\n        name\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      success\n      user {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;