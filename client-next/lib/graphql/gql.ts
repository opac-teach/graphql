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
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      success\n      message\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n        message\n        success\n    }\n}\n": typeof types.LogoutDocument,
    "\n  mutation CreateGenre($createGenreInput: CreateGenreInput!) {\n    createGenre(createGenreInput: $createGenreInput) {\n      id\n      name\n    }\n  }\n": typeof types.CreateGenreDocument,
    "\n  mutation UpdateGenre($updateGenreInput: UpdateGenreInput!) {\n    updateGenre(updateGenreInput: $updateGenreInput) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateGenreDocument,
    "\n  mutation DeleteGenre($id: String!) {\n    removeGenre(id: $id)\n  }\n": typeof types.DeleteGenreDocument,
    "\n  mutation CreateSong($createSongInput: CreateSongInput!) {\n    createSong(createSongInput: $createSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateSongDocument,
    "\n  mutation UpdateSong($updateSongInput: UpdateSongInput!) {\n    updateSong(updateSongInput: $updateSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UpdateSongDocument,
    "\n  mutation DeleteSong($id: String!) {\n    removeSong(id: $id) {\n      success\n      id\n    }\n  }\n": typeof types.DeleteSongDocument,
    "\n  mutation CreateUser($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      id\n      name\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": typeof types.MeDocument,
    "\n  query Genres {\n  genres {\n    id\n    name\n  }\n}\n": typeof types.GenresDocument,
    "\n  query Genre($id: String!) {\n    genre(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n        author {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.GenreDocument,
    "\n  query Songs($genreId: String) {\n    songs(genreId: $genreId) {\n      authorId\n      id\n      name\n      author {\n        email\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": typeof types.SongsDocument,
    "\n  query Song($id: String!) {\n    song(id: $id) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": typeof types.SongDocument,
    "\n  query Users {\n    users {\n      id\n      name\n      email\n    }\n  }\n": typeof types.UsersDocument,
    "\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      email\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserDocument,
};
const documents: Documents = {
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      success\n      message\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n        message\n        success\n    }\n}\n": types.LogoutDocument,
    "\n  mutation CreateGenre($createGenreInput: CreateGenreInput!) {\n    createGenre(createGenreInput: $createGenreInput) {\n      id\n      name\n    }\n  }\n": types.CreateGenreDocument,
    "\n  mutation UpdateGenre($updateGenreInput: UpdateGenreInput!) {\n    updateGenre(updateGenreInput: $updateGenreInput) {\n      id\n      name\n    }\n  }\n": types.UpdateGenreDocument,
    "\n  mutation DeleteGenre($id: String!) {\n    removeGenre(id: $id)\n  }\n": types.DeleteGenreDocument,
    "\n  mutation CreateSong($createSongInput: CreateSongInput!) {\n    createSong(createSongInput: $createSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": types.CreateSongDocument,
    "\n  mutation UpdateSong($updateSongInput: UpdateSongInput!) {\n    updateSong(updateSongInput: $updateSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": types.UpdateSongDocument,
    "\n  mutation DeleteSong($id: String!) {\n    removeSong(id: $id) {\n      success\n      id\n    }\n  }\n": types.DeleteSongDocument,
    "\n  mutation CreateUser($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      id\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query Genres {\n  genres {\n    id\n    name\n  }\n}\n": types.GenresDocument,
    "\n  query Genre($id: String!) {\n    genre(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n        author {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GenreDocument,
    "\n  query Songs($genreId: String) {\n    songs(genreId: $genreId) {\n      authorId\n      id\n      name\n      author {\n        email\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": types.SongsDocument,
    "\n  query Song($id: String!) {\n    song(id: $id) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n": types.SongDocument,
    "\n  query Users {\n    users {\n      id\n      name\n      email\n    }\n  }\n": types.UsersDocument,
    "\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      email\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n": types.UserDocument,
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
export function gql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Logout {\n    logout {\n        message\n        success\n    }\n}\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n        message\n        success\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateGenre($createGenreInput: CreateGenreInput!) {\n    createGenre(createGenreInput: $createGenreInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGenre($createGenreInput: CreateGenreInput!) {\n    createGenre(createGenreInput: $createGenreInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateGenre($updateGenreInput: UpdateGenreInput!) {\n    updateGenre(updateGenreInput: $updateGenreInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGenre($updateGenreInput: UpdateGenreInput!) {\n    updateGenre(updateGenreInput: $updateGenreInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteGenre($id: String!) {\n    removeGenre(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteGenre($id: String!) {\n    removeGenre(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSong($createSongInput: CreateSongInput!) {\n    createSong(createSongInput: $createSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSong($createSongInput: CreateSongInput!) {\n    createSong(createSongInput: $createSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSong($updateSongInput: UpdateSongInput!) {\n    updateSong(updateSongInput: $updateSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSong($updateSongInput: UpdateSongInput!) {\n    updateSong(updateSongInput: $updateSongInput) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSong($id: String!) {\n    removeSong(id: $id) {\n      success\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSong($id: String!) {\n    removeSong(id: $id) {\n      success\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($registerInput: RegisterInput!) {\n    register(registerInput: $registerInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Genres {\n  genres {\n    id\n    name\n  }\n}\n"): (typeof documents)["\n  query Genres {\n  genres {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Genre($id: String!) {\n    genre(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n        author {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Genre($id: String!) {\n    genre(id: $id) {\n      id\n      name\n      songs {\n        id\n        name\n        author {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Songs($genreId: String) {\n    songs(genreId: $genreId) {\n      authorId\n      id\n      name\n      author {\n        email\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Songs($genreId: String) {\n    songs(genreId: $genreId) {\n      authorId\n      id\n      name\n      author {\n        email\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Song($id: String!) {\n    song(id: $id) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Song($id: String!) {\n    song(id: $id) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      genre {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      email\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      email\n      name\n      songs {\n        id\n        name\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;