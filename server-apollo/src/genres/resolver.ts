import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
<<<<<<< Updated upstream
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
=======
    genres: (_, __, { dataSources }) => {
      const loader = dataSources.db.genre.createLoader();
      return dataSources.db.genre.findMany(loader, {}, {});
    },
    genreById: (_, { id }, { dataSources }) => {
      const loader = dataSources.db.genre.createLoader();
      const genre = dataSources.db.genre.findById(loader, id);
>>>>>>> Stashed changes
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
      const loader = dataSources.db.song.createLoader();
      const songs = await dataSources.db.song.findMany(
        loader,
        { genreId: parent.id },
        {
          limit,
          offset: page ? (page - 1) * limit : 0,
        }
      );
      if (!songs) {
        throw new GraphQLError("Songs not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
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
