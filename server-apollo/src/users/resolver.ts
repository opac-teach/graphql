import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit, offset }, { dataSources }) => {
      const allUsers = dataSources.db.user.findMany();
      return allUsers.slice(offset, offset + limit);
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
    updateUser: (_, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const user = dataSources.db.user.update(userId, input);
      return {
        success: true,
        user,
      };
    },
    deleteUser: (_, __, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const user = dataSources.db.user.delete(userId);
      return {
        success: true,
        user,
      };
    },
  },
};
