import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => {
      return dataSources.db.genre.findMany();
    },
  },
  Genre: {
    songs: (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId: parent.id });
    },
    songsCount: (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    },
  },
};