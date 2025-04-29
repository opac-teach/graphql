import { Resolvers } from "../types";
import { GraphQLError } from "graphql/error";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId, limit, offset }, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId }, { limit, offset });
    },
    songById: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    }
  },

  Song: {
    user: async (parent, _, { loaders }) => {
      return loaders.users.load(parent.userId);
    },
    genre: async (parent, _, { loaders }) => {
      return loaders.users.load(parent.genreId);
    },
  },

  Mutation: {
    createSong: (_, { input }, { dataSources, userId }) => {
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
      const { name, genreId } = input;
      const song = dataSources.db.song.create({ name, genreId, userId });
      return {
          success: true,
          song,
      };
    },
    updateSong: (_, { id, input }, { dataSources, userId }) => {
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
      const { name, genreId } = input;
      const song = dataSources.db.song.update(id, { name, genreId, userId });
      return {
          success: true,
          song,
      };
    },
    deleteSong:(_, { id }, { dataSources, userId }) => {
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
      const song = dataSources.db.song.findById(id);
      if (userId == song.userId) {
        dataSources.db.song.delete(id);
      }
      return {
        success: true,
        song,
      };
    }
  }
};
