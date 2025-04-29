import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: async (_, __, { dataSources }) => {
      const genres = dataSources.db.genre.findMany();

      return genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        songs: [] as any[],
      }));
    },
  },
  Genre: {
    songs: (parent, { limit, offset }, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ genreId: parent.id });
      return songs.slice(offset || 0, (offset || 0) + (limit || songs.length));
    },
    songsCount: (parent, _, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ genreId: parent.id });
      return songs.length;
    },
  },
  Mutation: {
    createGenre: (_, { input }, { dataSources }) => {
      const createdGenre = dataSources.db.genre.create(input);

      return {
        success: true,
        genre: {
          id: createdGenre.id,
          name: createdGenre.name,
          songs: [], 
        },
      };
    },
  },
};
