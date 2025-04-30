import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, { pagination }, { dataSources }) => {
      return dataSources.db.genre.findMany(_, pagination ? {
        limit: pagination.pageSize,
        offset: pagination.page * pagination.pageSize
      } : {});
    },
    genre: (_, { id }, { dataSources }) => {
      return dataSources.db.genre.findById(id);
    },
  },
  Genre: {
    songs: async (parent, { pagination }, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId: parent.id }, pagination ? {
        limit: pagination.pageSize,
        offset: pagination.page * pagination.pageSize
      } : {});
    },
    songsCount: async (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    },
  },
  Mutation: {
    createGenre: (_, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError(
          "You must be logged in to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      try {
        const genre = dataSources.db.genre.create(input);
        return {
          success: true,
          genre,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the create.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
    },
  },
};