import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.db.user.findMany();
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
    songCount: (parent, _, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ userId: parent.id });
      return songs.length;
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
  },
};
