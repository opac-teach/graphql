import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit, page }, { dataSources }) => {
      const loader = dataSources.db.user.createLoader();
      return dataSources.db.user.findMany(
        loader,
        {},
        {
          limit,
          offset: page,
        }
      );
    },
    user: (_, { id }, { dataSources }) => {
      const loader = dataSources.db.user.createLoader();
      return dataSources.db.user.findById(loader, id);
    },
  },
  User: {
    songs: (parent, _, { dataSources }) => {
      const loader = dataSources.db.song.createLoader();
      return dataSources.db.song.findMany(loader, { userId: parent.id }, {});
    },
    songCount: (parent, _, { dataSources }) => {
      const loader = dataSources.db.song.createLoader();
      return dataSources.db.song.count({
        userId: parent.id,
      });
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
