import { Resolvers } from "../types";

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
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
    songsCount: async(parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    }
  },

  Mutation: {
    createGenre: (_, { input }, { dataSources }) => {
      const genre = dataSources.db.genre.create(input);
      return {
        success: true,
        genre,
      };
    },
  },
};
