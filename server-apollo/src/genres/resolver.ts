import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres : (_, __, { dataSources }) => {
        return dataSources.db.genre.findMany();
    },
  },

};
