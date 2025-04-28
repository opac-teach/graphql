import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit = 100, offset = 0 }, { dataSources }) => {
      return dataSources.db.user.findMany({}, { limit, offset });
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
    songsCount: async (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ userId: parent.id });
    },
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      const user = dataSources.db.user.create(input);
      return {
        success: true,
        user,
      };
    },
    updateUser: (_, { input, id }, { dataSources, userId }) => {
      const user = dataSources.db.user.findById(id);

      if (user.id !== userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const updatedUser = dataSources.db.user.update(id, input);
      return {
        success: true,
        user: updatedUser,
      };
    },
    deleteUser: (_, { id }, { dataSources, userId }) => {
      const user = dataSources.db.user.findById(id);

      if (user.id !== userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      dataSources.db.user.delete(id);

      return {
        success: true,
        id: user.id,
      };
    },
  },
};
