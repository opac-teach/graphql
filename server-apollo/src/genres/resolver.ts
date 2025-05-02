import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: async(_, __, { dataSources }) => {
        return dataSources.db.genre.findMany();
      },
      genre: (_, { id }, { dataSources }) => {
        return dataSources.db.genre.findById(id);
      },
  },
  Genre: {
    songs: async (parent, { pagination }, { dataSources }) => {
      const allSongs = dataSources.db.song.findMany({ genreId: parent.id });
  
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const offset = (page - 1) * pageSize;
  
      return allSongs.slice(offset, offset + pageSize);},
    songsCount: (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    }

  },
  
  Mutation: {
    createGenre: (_, { input }, { dataSources }) => {
      const genres = dataSources.db.genre.create(input);
      return {
        success: true,
        genres,
      };
    },
  },

}