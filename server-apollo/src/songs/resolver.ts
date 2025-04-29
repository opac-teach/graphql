import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId }, { dataSources }) => {
      return dataSources.db.song.findMany(genreId ? { genreId } : {});
    },
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
    genre: async (parent, _, { dataSources }) => {
      return dataSources.db.genre.findById(parent.genreId);
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

      try {
        const song = dataSources.db.song.create(input);
        return {
          success: true,
          song,
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
    deleteSong: (_, { id }, { dataSources, userId }) => {
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

      const songToDelete = dataSources.db.song.findById(id);

      if (!songToDelete) {
        throw new GraphQLError(
          "Song not found.",
          {
            extensions: {
              code: "NOT FOUND",
            },
          }
        );
      }

      if (userId !== songToDelete.userId) {
        throw new GraphQLError(
          "You must be logged as the user who owns this song to perform this action.",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }

      try {
        dataSources.db.song.delete(songToDelete.id);
        return {
          success: true,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the delete.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
    },
    updateSong: (_, { id, input}, { dataSources, userId }) => {
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

      const songToUpdate = dataSources.db.song.findById(id);

      if (!songToUpdate) {
        throw new GraphQLError(
          "Song not found.",
          {
            extensions: {
              code: "NOT FOUND",
            },
          }
        );
      }

      if (userId !== songToUpdate.userId) {
        throw new GraphQLError(
          "You must be logged as the user who owns this song to perform this action.",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }
      
      try {
        const song = dataSources.db.song.update(id, input);

        return {
          success: true,
          song,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the update.",
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
