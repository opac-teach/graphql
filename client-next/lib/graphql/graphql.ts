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

/** The input for creating a new genre */
export type CreateGenreInput = {
  /** The name of the genre */
  name: Scalars['String']['input'];
};

export type CreateGenreResponse = {
  __typename?: 'CreateGenreResponse';
  /** The created genre */
  genre: Genre;
  /** Whether the genre was created successfully */
  success: Scalars['Boolean']['output'];
};

/** The input for creating a new song */
export type CreateSongInput = {
  /** The genre of the song */
  genreId: Scalars['String']['input'];
  /** The name of the song */
  name: Scalars['String']['input'];
};

export type CreateSongResponse = {
  __typename?: 'CreateSongResponse';
  /** The created song */
  song: Song;
  /** Whether the song was created successfully */
  success: Scalars['Boolean']['output'];
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

export type DeleteSongResponse = {
  __typename?: 'DeleteSongResponse';
  /** Whether the song was created successfully */
  success: Scalars['Boolean']['output'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  /** Whether the user was created successfully */
  success: Scalars['Boolean']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  /** The ID of the genre */
  id: Scalars['ID']['output'];
  /** The genre */
  name: Scalars['String']['output'];
  /** The song */
  songs: Array<Song>;
  songsCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new genre */
  createGenre: CreateGenreResponse;
  /** Create a new song */
  createSong: CreateSongResponse;
  /** Create a new user */
  createUser: CreateUserResponse;
  deleteSong: DeleteSongResponse;
  deleteUser: DeleteUserResponse;
  updateSong: UpdateSongResponse;
  updateUser: UpdateUserResponse;
};


export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteSongArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateSongArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSongInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get genre by id */
  genre: Genre;
  /** Get all genre */
  genres: Array<Genre>;
  /** Get song by id */
  song: Song;
  /** Get all songs */
  songs: Array<Song>;
  /** Get a user by ID */
  user: User;
  /** Get all users */
  users: Array<User>;
};


export type QueryGenreArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySongArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySongsArgs = {
  genreId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Song = {
  __typename?: 'Song';
  /** The genre of the song */
  genre: Genre;
  /** The ID of the song */
  id: Scalars['ID']['output'];
  /** The name of the song */
  name: Scalars['String']['output'];
  /** The user of the song */
  user: User;
};

/** The input for creating a new song */
export type UpdateSongInput = {
  /** The genre of the song */
  genreId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the song */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSongResponse = {
  __typename?: 'UpdateSongResponse';
  /** The created song */
  song: Song;
  /** Whether the song was created successfully */
  success: Scalars['Boolean']['output'];
};

/** The input for creating a new user */
export type UpdateUserInput = {
  /** The name of the user */
  name: Scalars['String']['input'];
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  /** Whether the user was created successfully */
  success: Scalars['Boolean']['output'];
  /** The created user */
  user: User;
};

export type User = {
  __typename?: 'User';
  /** The ID of the user */
  id: Scalars['ID']['output'];
  /** The name of the user */
  name: Scalars['String']['output'];
  /** The songs of the user */
  songs: Array<Song>;
};

export type MutationMutationVariables = Exact<{
  input: CreateGenreInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createGenre: { __typename?: 'CreateGenreResponse', success: boolean, genre: { __typename?: 'Genre', name: string, id: string } } };

export type GenreQueryVariables = Exact<{
  genreId: Scalars['ID']['input'];
}>;


export type GenreQuery = { __typename?: 'Query', genre: { __typename?: 'Genre', id: string, name: string, songsCount: number, songs: Array<{ __typename?: 'Song', id: string, name: string }> } };

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: string, name: string, songsCount: number }> };

export type GenresCreateSongQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresCreateSongQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: string, name: string }> };

export type CreateSongMutationVariables = Exact<{
  input: CreateSongInput;
}>;


export type CreateSongMutation = { __typename?: 'Mutation', createSong: { __typename?: 'CreateSongResponse', success: boolean, song: { __typename?: 'Song', id: string, name: string } } };

export type DeleteSongMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSongMutation = { __typename?: 'Mutation', deleteSong: { __typename?: 'DeleteSongResponse', success: boolean } };

export type GenresUpdateSongQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresUpdateSongQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: string, name: string }> };

export type UpdateSongMutationVariables = Exact<{
  updateSongId: Scalars['ID']['input'];
  input: UpdateSongInput;
}>;


export type UpdateSongMutation = { __typename?: 'Mutation', updateSong: { __typename?: 'UpdateSongResponse', success: boolean } };

export type SongQueryVariables = Exact<{
  songId: Scalars['ID']['input'];
}>;


export type SongQuery = { __typename?: 'Query', song: { __typename?: 'Song', id: string, name: string, user: { __typename?: 'User', id: string, name: string }, genre: { __typename?: 'Genre', id: string, name: string } } };

export type SongsQueryVariables = Exact<{ [key: string]: never; }>;


export type SongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'Song', id: string, name: string, user: { __typename?: 'User', id: string, name: string } }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', success: boolean, user: { __typename?: 'User', id: string, name: string } } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, songs: Array<{ __typename?: 'Song', id: string, name: string }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string }> };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGenreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGenre"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GenreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Genre"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"songsCount"}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GenreQuery, GenreQueryVariables>;
export const GenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"songsCount"}}]}}]}}]} as unknown as DocumentNode<GenresQuery, GenresQueryVariables>;
export const GenresCreateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenresCreateSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GenresCreateSongQuery, GenresCreateSongQueryVariables>;
export const CreateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSongMutation, CreateSongMutationVariables>;
export const DeleteSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteSongMutation, DeleteSongMutationVariables>;
export const GenresUpdateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenresUpdateSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GenresUpdateSongQuery, GenresUpdateSongQueryVariables>;
export const UpdateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSongId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSongId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateSongMutation, UpdateSongMutationVariables>;
export const SongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Song"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"songId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"songId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SongQuery, SongQueryVariables>;
export const SongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SongsQuery, SongsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;