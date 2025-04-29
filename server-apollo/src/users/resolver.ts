import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit, page }, { dataSources }) => {
<<<<<<< Updated upstream
      return dataSources.db.user.findMany(undefined, {
        limit: limit,
        offset: page ? (page - 1) * limit : 0,
      });
=======
      const loader = dataSources.db.user.createLoader();
      return dataSources.db.user.findMany(
        loader,
        {},
        {
          limit,
          offset: page,
        }
      );
>>>>>>> Stashed changes
    },
    user: (_, { id }, { dataSources }) => {
      const loader = dataSources.db.user.createLoader();
      return dataSources.db.user.findById(loader, id);
    },
  },
  User: {
<<<<<<< Updated upstream
    songs: (parent, _, { dataSources, loaders }) => {
      return loaders.songsByUser.load(parent.id);
=======
    songs: (parent, _, { dataSources }) => {
      const loader = dataSources.db.song.createLoader();
      return dataSources.db.song.findMany(loader, { userId: parent.id }, {});
>>>>>>> Stashed changes
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
