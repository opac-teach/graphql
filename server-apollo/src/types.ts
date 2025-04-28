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
  genreById: Genre;
  /** Get all genres */
  genres: Array<Genre>;
  /** Get a song by ID */
  songById: Song;
  /** Get all songs */
  songs: Array<Song>;
  /** Get all songs with users */
  songsWithUsers: Array<Song>;
  /** Get a user by ID */
  user: User;
  /** Get all users */
  users: Array<User>;
};


export type QueryGenreByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySongByIdArgs = {
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
  CreateSongInput: CreateSongInput;
  CreateSongResponse: ResolverTypeWrapper<Omit<CreateSongResponse, 'song'> & { song: ResolversTypes['Song'] }>;
  CreateUserInput: CreateUserInput;
  CreateUserResponse: ResolverTypeWrapper<Omit<CreateUserResponse, 'user'> & { user: ResolversTypes['User'] }>;
  EditSongInput: EditSongInput;
  EditSongResponse: ResolverTypeWrapper<Omit<EditSongResponse, 'song'> & { song: ResolversTypes['Song'] }>;
  Genre: ResolverTypeWrapper<DBGenre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Song: ResolverTypeWrapper<DBSong>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<DBUser>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateSongInput: CreateSongInput;
  CreateSongResponse: Omit<CreateSongResponse, 'song'> & { song: ResolversParentTypes['Song'] };
  CreateUserInput: CreateUserInput;
  CreateUserResponse: Omit<CreateUserResponse, 'user'> & { user: ResolversParentTypes['User'] };
  EditSongInput: EditSongInput;
  EditSongResponse: Omit<EditSongResponse, 'song'> & { song: ResolversParentTypes['Song'] };
  Genre: DBGenre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Song: DBSong;
  String: Scalars['String']['output'];
  User: DBUser;
}>;

export type CreateSongResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['CreateSongResponse'] = ResolversParentTypes['CreateSongResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditSongResponseResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['EditSongResponse'] = ResolversParentTypes['EditSongResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  song?: Resolver<ResolversTypes['Song'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<GenreSongsArgs, 'limit' | 'page'>>;
  songsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createSong?: Resolver<ResolversTypes['CreateSongResponse'], ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  editSong?: Resolver<ResolversTypes['EditSongResponse'], ParentType, ContextType, RequireFields<MutationEditSongArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  genreById?: Resolver<ResolversTypes['Genre'], ParentType, ContextType, RequireFields<QueryGenreByIdArgs, 'id'>>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  songById?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<QuerySongByIdArgs, 'id'>>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QuerySongsArgs, 'limit' | 'page'>>;
  songsWithUsers?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'limit' | 'page'>>;
}>;

export type SongResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = ResolversObject<{
  genreId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolversContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolversContext> = ResolversObject<{
  CreateSongResponse?: CreateSongResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  EditSongResponse?: EditSongResponseResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

