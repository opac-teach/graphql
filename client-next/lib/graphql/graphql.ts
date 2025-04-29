/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateSongInput = {
  /** The id of the genre of the song */
  genreId: Scalars['ID']['input'];
  /** The name of the song */
  name: Scalars['String']['input'];
};

export type CreateSongResponse = {
  __typename?: 'CreateSongResponse';
  /** The error message if the creation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** The created song */
  song: Song;
};

/** The input for creating a new user */
export type CreateUserInput = {
  /** The name of the user */
  name: Scalars['String']['input'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  /** Whether the user was created successfully */
  success: Scalars['Boolean']['output'];
  /** The created user */
  user: User;
};

export type EditSongInput = {
  /** The id of the genre of the song */
  genreId?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the song */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EditSongResponse = {
  __typename?: 'EditSongResponse';
  /** The error message if the creation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** The edited song */
  song: Song;
};

export type Genre = {
  __typename?: 'Genre';
  /** The ID of the genre */
  id: Scalars['ID']['output'];
  /** The name of the genre */
  name: Scalars['String']['output'];
  /** The songs in this genre */
  songs: Array<Song>;
  /** The count of songs in this genre */
  songsCount: Scalars['Int']['output'];
};


export type GenreSongsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new song */
  createSong: CreateSongResponse;
  /** Create a new user */
  createUser: CreateUserResponse;
  /** edit a song */
  editSong: EditSongResponse;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditSongArgs = {
  id: Scalars['ID']['input'];
  input: EditSongInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get a genre by ID */
  genre: Genre;
  /** Get all genres */
  genres: Array<Genre>;
  /** Get a song by ID */
  song: Song;
  /** Get all songs */
  songs: Array<Song>;
  /** Get all songs with users */
  songsWithUsers: Array<Song>;
  /** Get a user by ID */
  user: User;
  /** Get all users */
  users: Array<User>;
};


export type QueryGenreArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGenresArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QuerySongArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySongsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Song = {
  __typename?: 'Song';
  /** The genre of the song */
  genre: Genre;
  /** The id of the genre of the song */
  genreId: Scalars['ID']['output'];
  /** The ID of the song */
  id: Scalars['ID']['output'];
  /** The name of the song */
  name: Scalars['String']['output'];
  /** user who created the song */
  user: User;
};

export type User = {
  __typename?: 'User';
  /** The ID of the user */
  id: Scalars['ID']['output'];
  /** The name of the user */
  name: Scalars['String']['output'];
  /** The count of songs of the user */
  songCount: Scalars['Int']['output'];
  /** The songs of the user */
  songs: Array<Song>;
};

export type GenresQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: string, name: string }> };

export type SongsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type SongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'Song', id: string, name: string, user: { __typename?: 'User', id: string, name: string }, genre: { __typename?: 'Genre', id: string, name: string } }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', success: boolean, user: { __typename?: 'User', id: string, name: string } } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, songs: Array<{ __typename?: 'Song', id: string, name: string }> } };

export type UsersQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string }> };


export const GenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Genres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GenresQuery, GenresQueryVariables>;
export const SongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Songs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"songs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SongsQuery, SongsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;