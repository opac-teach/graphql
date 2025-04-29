import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId, limit, offset }, { dataSources }) => {
      let allSongs = dataSources.db.song.findMany();
      if (genreId) {
        allSongs = allSongs.filter((song) => song.genreId === genreId);
      }
      return allSongs.slice(offset || 0, (offset || 0) + (limit || allSongs.length));
    },
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
    genre: (parent, _, { dataSources }) => {
      const genre = dataSources.db.genre.findById(parent.genreId);
      if (!genre) return null;
      return {
        ...genre,
        songs: dataSources.db.song.findMany({ genreId: genre.id }),
      };
    },
  },
  Mutation: {
    createSong: (_, { input }, { userId, dataSources }) => {
      if (!userId) throw new Error("Non connecté");
      const newSong = dataSources.db.song.create({ ...input, userId });
      return { success: true, song: newSong };
    },
  
    updateSong: (_, { id, input }, { userId, dataSources }) => {
      const song = dataSources.db.song.findById(id);
      if (!song || song.userId !== userId) throw new Error("Non authorizé");
      const updated = dataSources.db.song.update(id, input);
      return { success: true, song: updated };
    },
  
    deleteSong: (_, { id }, { userId, dataSources }) => {
      const song = dataSources.db.song.findById(id);
      if (!song || song.userId !== userId) throw new Error("Non authorizé");
      dataSources.db.song.delete(id);
      return { success: true };
    }
  }
};
