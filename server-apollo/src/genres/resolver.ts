import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, { limit, page }, { dataSources }) => {
      return dataSources.db.genre.findMany(
        {},
        {
          limit: limit,
          offset: page ? (page - 1) * limit : 0,
        }
      );
    },
    genre: (_, { id }, { dataSources }) => {
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
    songs: async (parent, { limit, page }, { dataSources }) => {
      const songs = dataSources.db.song.findMany(
        {
          genreId: parent.id,
        },
        {
          limit,
          offset: page ? (page - 1) * limit : 0,
        }
      );
      return songs;
    },
    songsCount: async (parent, _, { dataSources }) => {
      const allSongs = dataSources.db.song.count({
        genreId: parent.id,
      });
      return allSongs;
    },
  },
};
