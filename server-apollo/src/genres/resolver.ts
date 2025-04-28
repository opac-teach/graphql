import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => {
      return dataSources.db.genre.findMany();
    },
    genreById: (_, { id }, { dataSources }) => {
      const genre = dataSources.db.genre.findById(id);
      if (!genre) {
        throw new GraphQLError("Genre not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return genre;
    },
  },
  Genre: {
    songs: async (parent, _, { dataSources }) => {
      // as findByGenreId method doesnt exists
      const allSongs = dataSources.db.song.findMany();
      const songs = allSongs.filter((song) => song.genreId === parent.id);
      return songs;
    },
    songsCount: async (parent, _, { dataSources }) => {
      const allSongs = dataSources.db.song.findMany();
      const songs = allSongs.filter((song) => song.genreId === parent.id);
      return songs.length;
    },
  },
};
