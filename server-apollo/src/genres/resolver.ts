import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import { z } from "zod";

const createGenreInputSchema = z.object({
  name: z.string().min(3),
})

const genreIdParamSchema = z.string().uuid();

const genresPaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
})

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, { pagination }, { dataSources }) => {
      if (pagination) {
        try {
          genresPaginationSchema.parse(pagination);
        } catch (error) {
          throw new GraphQLError(
            `${error}`,
            {
              extensions: {
                code: "BAD_USER_INPUT",
              }
            }
          )
        }
      }

      return dataSources.db.genre.findMany(_, pagination ? {
        limit: pagination.pageSize,
        offset: pagination.page * pagination.pageSize
      } : {});
    },
    genre: (_, { id }, { dataSources }) => {
      try {
        genreIdParamSchema.parse(id);
      } catch (error) {
        throw new GraphQLError(
          `${error}`,
          {
            extensions: {
              code: "BAD_USER_INPUT",
            }
          }
        )
      }

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
        createGenreInputSchema.parse(input);
      } catch (error) {
        throw new GraphQLError(
          `${error}`,
          {
            extensions: {
              code: "BAD_USER_INPUT",
            }
          }
        )
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