import { Resolvers } from "../types";
import {GraphQLError} from "graphql";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { pagination }, { dataSources }) => {
      return dataSources.db.user.findMany(_, {
        limit: pagination?.pageSize,
        offset: pagination?.page
      });
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, { pagination }, { dataSources }) => {
      return dataSources.db.song.findMany(
          { userId: parent.id },
          { limit: pagination?.pageSize, offset: pagination?.page }
      );
    },
    songsCount: async (parent, _: {}, { dataSources }) => {
      return dataSources.db.song.count({ userId: parent.id });
    }
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      const user = dataSources.db.user.create(input);
      return {
        success: true,
        user,
      };
    },
    updateUser: (_, { id, input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const user = dataSources.db.user.findById(id);

      if (!user) {
        throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      }

      if (user.id !== userId) {
        throw new GraphQLError("Forbidden", { extensions: { code: "FORBIDDEN" } });
      }

      const userUpdated = dataSources.db.user.update(id, input);

      return {
        success: true,
        user: userUpdated
      };
    },
    deleteUser: (_, { id }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const user = dataSources.db.user.findById(id);

      if (!user) {
        throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      }

      if (user.id !== userId) {
        throw new GraphQLError("Forbidden", { extensions: { code: "FORBIDDEN" } });
      }

      dataSources.db.user.delete(id);

      return {
        success: true
      };
    }
  },
};
