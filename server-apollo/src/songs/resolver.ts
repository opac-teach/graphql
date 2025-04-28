import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, __, { dataSources }) => {
      return dataSources.db.song.findMany();
    },
  },
  Song: {
    user: async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
  },
};
