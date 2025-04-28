import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres : (_, __, { dataSources }) => {
        return dataSources.db.genre.findMany();
    },
  },

  Genre : {
    songsCount: async (parent, _, { dataSources }) => {
      const songCount = dataSources.db.song.count({ genreId : parent.id});
      return songCount
    },
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
