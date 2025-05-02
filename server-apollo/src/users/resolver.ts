import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit }, { dataSources }) => {
      return dataSources.db.user.findMany(undefined, { limit });
    },
    user: (_, { id }, { dataSources }) => {
      var user = dataSources.db.user.findById(id);
      return user;
    },
  },
  User: {
    songs: async (parent, { limit }, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id }, { limit });
    },
    songCount: async (parent, _, { dataSources }) => {
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
    updateUser: (_, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const user = dataSources.db.user.update(userId, input );
      return {
        success: true,
        user,
      };
    },
    deleteUser: async (_, {}, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const user = dataSources.db.user.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      dataSources.db.user.delete(userId);
      return {
        success: true,
        user,
      }
    }
  },
};
