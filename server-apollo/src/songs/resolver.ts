import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, {genreId}, { dataSources }) => {
      return dataSources.db.song.findMany(genreId ? { genreId } : {});
    },

    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },
  Song: {
    user: async(parent, _, { dataSources }) => {
      const userId = parent.userId;
      if (!userId) {
        throw new GraphQLError("Song does not have a userId");
      }
      return dataSources.db.user.findById(userId);
    },
    genre: async(parent, _, { dataSources }) => {
      const genreId = parent.genreId;
      if (!genreId) {
        throw new GraphQLError("Song does not have a genreId");
      }
      return dataSources.db.genre.findById(genreId);
    },
  },

};

