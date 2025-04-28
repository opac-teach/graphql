import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, __, { dataSources }) => {
      return dataSources.db.song.findMany();
    },

    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: async(parent, _, { dataSources }) => {
      const userId = parent.userId;
      if (!userId) {
        throw new GraphQLError("Song does not have a userId");
      }
      return dataSources.db.user.findById(userId);
    }
  }
};

