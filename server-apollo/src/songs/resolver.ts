import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, {genreId}, { dataSources }) => {
      if (!genreId) return  dataSources.db.song.findMany();
      return  dataSources.db.song.findMany({genreId});
    },

    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },

  Song: {
   user : async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
    genre: async (parent, _, { dataSources }) => {
      return dataSources.db.genre.findById(parent.genreId);
    },
  },

  Mutation: {
      createSong: (_, { input }, { dataSources, userId }) => {
          const newSong = dataSources.db.song.create({...input, userId})
          return {
              success: true,
              song: newSong
          }
      }
  }
};
