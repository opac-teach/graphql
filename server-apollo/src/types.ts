import { GraphQLResolveInfo } from 'graphql';
import { DBUser, DBSong, DBGenre } from './datasource';
import { ResolversContext } from './index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  /** The ID of the genre */
  genreId: Scalars['ID']['input'];
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
  /** Whether the song was deleted successfully */
  success: Scalars['Boolean']['output'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  /** Whether the user was deleted successfully */
  success: Scalars['Boolean']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  /** The ID of the genre */
  id: Scalars['ID']['output'];
  /** The name of the genre */
  name: Scalars['String']['output'];
  /** The song with this genre */
  songs: Array<Song>;
  /** Number of song of genre */
  songsCount?: Maybe<Scalars['Int']['output']>;
};


export type GenreSongsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new genre */
  createGenre: CreateGenreResponse;
  /** Create a new song */
  createSong: CreateSongResponse;
  /** Create a new user */
  createUser: CreateUserResponse;
  /** delete a song */
  deleteSong: DeleteSongResponse;
  /** delete a user */
  deleteUser: DeleteUserResponse;
  /** update a song */
  updateSong: UpdateSongResponse;
  /** update a user */
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
  songId: Scalars['ID']['input'];
};


export type MutationUpdateSongArgs = {
  name: UpdateSongInput;
  songId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get a genre by ID */
  genre: Genre;
  /** Get all genre */
  genres: Array<Genre>;
  /** Get a song by ID */
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
  /** The user who created the song */
  user: User;
};

export type UpdateSongInput = {
  /** The name of the song */
  name: Scalars['String']['input'];
};

export type UpdateSongResponse = {
  __typename?: 'UpdateSongResponse';
  /** The updated song */
  song: Song;
  /** Whether the song was updated successfully */
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  /** The name of the user */
  name: Scalars['String']['input'];
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  /** Whether the user was updated successfully */
  success: Scalars['Boolean']['output'];
  /** The updated user */
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
  /** Number of song of user */
  songsCount?: Maybe<Scalars['Int']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateGenreInput: CreateGenreInput;
  CreateGenreResponse: ResolverTypeWrapper<Omit<CreateGenreResponse, 'genre'> & { genre: ResolversTypes['Genre'] }>;
  CreateSongInput: CreateSongInput;
  CreateSongResponse: ResolverTypeWrapper<Omit<CreateSongResponse, 'song'> & { song: ResolversTypes['Song'] }>;
  CreateUserInput: CreateUserInput;
  CreateUserResponse: ResolverTypeWrapper<Omit<CreateUserResponse, 'user'> & { user: ResolversTypes['User'] }>;
  DeleteSongResponse: ResolverTypeWrapper<DeleteSongResponse>;
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>;
  Genre: ResolverTypeWrapper<DBGenre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Song: ResolverTypeWrapper<DBSong>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateSongInput: UpdateSongInput;
  UpdateSongResponse: ResolverTypeWrapper<Omit<UpdateSongResponse, 'song'> & { song: ResolversTypes['Song'] }>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserResponse: ResolverTypeWrapper<Omit<UpdateUserResponse, 'user'> & { user: ResolversTypes['User'] }>;
  User: ResolverTypeWrapper<DBUser>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateGenreInput: CreateGenreInput;
  CreateGenreResponse: Omit<CreateGenreResponse, 'genre'> & { genre: ResolversParentTypes['Genre'] };
  CreateSongInput: CreateSongInput;
  CreateSongResponse: Omit<CreateSongResponse, 'song'> & { song: ResolversParentTypes['Song'] };
  CreateUserInput: CreateUserInput;
  CreateUserResponse: Omit<CreateUserResponse, 'user'> & { user: ResolversParentTypes['User'] };
  DeleteSongResponse: DeleteSongResponse;
  DeleteUserResponse: DeleteUserResponse;
  Genre: DBGenre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Song: DBSong;
  String: Scalars['String']['output'];
  UpdateSongInput: UpdateSongInput;
  UpdateSongResponse: Omit<UpdateSongResponse, 'song'> & { song: ResolversParentTypes['Song'] };
  UpdateUserInput: UpdateUserInput;
  UpdateUserResponse: Omit<UpdateUserResponse, 'user'> & { user: ResolversParentTypes['User'] };
  User: DBUser;
}>;

export type CreateGenreResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['CreateGenreResponse'] = ResolversParentTypes['CreateGenreResponse']> = ResolversObject<{
  genre?: Resolver<ResolversTypes['Genre'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateSongResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['CreateSongResponse'] = ResolversParentTypes['CreateSongResponse']> = ResolversObject<{
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteSongResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['DeleteSongResponse'] = ResolversParentTypes['DeleteSongResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteUserResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType, Partial<GenreSongsArgs>>;
  songsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createGenre?: Resolver<ResolversTypes['CreateGenreResponse'], ParentType, ContextType, RequireFields<MutationCreateGenreArgs, 'input'>>;
  createSong?: Resolver<ResolversTypes['CreateSongResponse'], ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteSong?: Resolver<ResolversTypes['DeleteSongResponse'], ParentType, ContextType, RequireFields<MutationDeleteSongArgs, 'songId'>>;
  deleteUser?: Resolver<ResolversTypes['DeleteUserResponse'], ParentType, ContextType>;
  updateSong?: Resolver<ResolversTypes['UpdateSongResponse'], ParentType, ContextType, RequireFields<MutationUpdateSongArgs, 'name' | 'songId'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  genre?: Resolver<ResolversTypes['Genre'], ParentType, ContextType, RequireFields<QueryGenreArgs, 'id'>>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<QuerySongArgs, 'id'>>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType, Partial<QuerySongsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type SongResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = ResolversObject<{
  genre?: Resolver<ResolversTypes['Genre'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateSongResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['UpdateSongResponse'] = ResolversParentTypes['UpdateSongResponse']> = ResolversObject<{
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['UpdateUserResponse'] = ResolversParentTypes['UpdateUserResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  songsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolversContext> = ResolversObject<{
  CreateGenreResponse?: CreateGenreResponseResolvers<ContextType>;
  CreateSongResponse?: CreateSongResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  DeleteSongResponse?: DeleteSongResponseResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  UpdateSongResponse?: UpdateSongResponseResolvers<ContextType>;
  UpdateUserResponse?: UpdateUserResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

