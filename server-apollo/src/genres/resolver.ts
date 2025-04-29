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
      const genreId = parent.id;

      if (!genreId) {
        throw new Error("Genre does not have an id");
      }
      return dataSources.db.song.findMany({ genreId });
    },
    songCount: async (parent, _, { dataSources }) => {
      const genreId = parent.id;

      if (!genreId) {
        throw new Error("Genre does not have an id");
      }
      return dataSources.db.song.count({ genreId });
    }
  },

  Mutation: {
    createGenre: (_, { input }, { dataSources }) => {
      const genre = dataSources.db.genre.create(input);
      return {
        success: true,
        genre,
      };
    }
  }
}