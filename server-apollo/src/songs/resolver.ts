import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, __, { dataSources }) => {
      return dataSources.db.song.findMany();
    },
    
    song: (_, {id}, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },

  Song: {
    user: async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.id);
    },
  },
};
