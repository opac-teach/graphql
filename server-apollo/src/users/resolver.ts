import { Resolvers } from "../types";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

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
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      const user = dataSources.db.user.create(input);
      pubSub.publish("USER_CREATED", { userCreated: user });

      return {
        success: true,
        user,
      };
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.asyncIterableIterator("USER_CREATED"),
    },
  },
};
