import { Resolvers } from "../types";
import {GraphQLError} from "graphql/error";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => {
      return dataSources.db.genre.findMany();
    },
    genreById: (_, { id }, { dataSources }) => {
        return dataSources.db.genre.findById(id);
    },
  },

  Genre: {
    songs: async (parent, __, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId: parent.id });
    },
    songsCount: async(parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    }
  },

  Mutation: {
    createGenre: (_, { input }, { dataSources, userId }) => {
      const genre = dataSources.db.genre.create(input);
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
      return {
        success: true,
        genre,
      };
    },
  },
};
