import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, __, { dataSources }) => {
      return dataSources.db.song.findMany();
    },
    songById: (_, { id }, { dataSources }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        throw new GraphQLError("Song not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return song;
    },
  },
  Song: {
    user: async (parent, _, { dataSources }) => {
      const user = dataSources.db.user.findById(parent.userId);
      return user;
    },
  },
};
