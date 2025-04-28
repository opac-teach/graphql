import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId }, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId });
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
      console.log("userId", userId);
      if (!userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const allGenreId = dataSources.db.genre
        .findMany()
        .map((genre) => genre.id);

      if (!allGenreId.includes(input.genreId)) {
        throw new GraphQLError("Le genre n'existe pas");
      }

      const song = dataSources.db.song.create({
        ...input,
        userId,
      });

      return {
        success: true,
        song,
      };
    },

    updateSong: (_, { id, input }, { dataSources, userId }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        throw new GraphQLError("Not Found");
      }

      if (song.userId !== userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const updatedSong = dataSources.db.song.update(id, input);

      return {
        success: true,
        song: updatedSong,
      };
    },

    deleteSong: (_, { id }, { dataSources, userId }) => {
      const songToDelete = dataSources.db.song.findById(id);
      if (!songToDelete) {
        throw new GraphQLError("Not Found");
      }

      if (songToDelete.userId !== userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      dataSources.db.song.delete(id);

      return {
        success: true,
        id,
      };
    },
  },
};
