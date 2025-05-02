import { getDataLoader } from "../FakeORM";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_,  {genreId, limit}, { dataSources }) => {
      const filter = genreId ? { genreId } : undefined;
      const options = { limit };
      if (genreId) {
        return dataSources.db.song.findMany(filter, options);
      }else {
        return dataSources.db.song.findMany(undefined, options);
      }
    },
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: async (parent, _, { loaders }) => {
      return loaders.users.load(parent.userId);
    },
    genre: async (parent, _, { loaders }) => {
      return loaders.genres.load(parent.genreId);
    },
  },
  Mutation: {
    createSong: (_, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const song = dataSources.db.song.create({...input, userId});
      return {
        success: true,
        song,
      };
    },
    updateSong: (_, { id, input }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const song = dataSources.db.song.update(id, {...input});
      return {
        success: true,
        song,
      };
    },
    deleteSong: async (_, { id }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const song = dataSources.db.song.findById(id);
      if (!song) {
        throw new Error("Song not found");
      }
      dataSources.db.song.delete(id);
      return {
        success: true,
        song,
      };
    },
  },


};
