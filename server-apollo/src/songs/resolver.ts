import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: async (_, { limit, offset }, { dataSources }) => {
      const allSongs = await dataSources.db.song.findMany();
      return allSongs.slice(offset, offset + limit);
    },        
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
    genre: async (parent, _, { dataSources }) => {
      return dataSources.db.genre.findById(parent.genreId);
    },
  },
  Mutation: {
    createSong: (_, { input }, { dataSources, userId }) => {
      const song = dataSources.db.song.create({...input, userId});
      return {
        success: true,
        song,
      };
    },
    updateSong: (_, { name, songId }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const song = dataSources.db.song.findById(songId);
      if (!song) {
        throw new Error("Song not found");
      }

      if (song.userId !== userId) {
        throw new Error("You are not authorized to update this song");
      }

      const updatedSong = dataSources.db.song.update(songId, name);
      return {
        success: true,
        song: updatedSong,
      };
    },
    deleteSong: (_, { songId }, { dataSources, userId }) => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const song = dataSources.db.song.findById(songId);
      if (!song) {
        throw new Error("Song not found");
      }

      if (song.userId !== userId) {
        throw new Error("You are not authorized to update this song");
      }

      const songDeleted = dataSources.db.song.delete(songId);
      return {
        success: true,
        song: songDeleted,
      };
    },
  },
};