import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres : (_, __, { dataSources }) => {
        return dataSources.db.genre.findMany();
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
