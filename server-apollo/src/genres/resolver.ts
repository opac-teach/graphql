import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => {
      return dataSources.db.genre.findMany();
    },
    genre: (_, { id }, { dataSources }) => {
      return dataSources.db.genre.findById(id);
    },
  },
  Genre: {
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId: parent.id });
    },
    songsCount: async (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    },
  },
  Mutation: {
    createGenre: (_, { input }, { dataSources, role, userId }) => {
      if (role !== "ADMIN" || !userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      const genre = dataSources.db.genre.create(input);
      return {
        success: true,
        genre,
      };
    },

    updateGenre: (_, { input, id }, { dataSources, role, userId }) => {
      if (role !== "ADMIN" || !userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      const updatedGenre = dataSources.db.genre.update(id, input);
      return {
        success: true,
        genre: updatedGenre,
      };
    },

    deleteGenre: (_, { id }, { dataSources, role, userId }) => {
      if (role !== "ADMIN" || !userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      const genre = dataSources.db.genre.findById(id);

      // supprime tout les sons liés à ce genre
      const allSongs = dataSources.db.song.findMany({ genreId: id });
      allSongs.forEach((song) => {
        dataSources.db.song.delete(song.id);
      });

      dataSources.db.genre.delete(id);
      return {
        success: true,
        id: genre.id,
      };
    },
  },
};
