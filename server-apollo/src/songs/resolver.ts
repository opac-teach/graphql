import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, {genreId, pagination}, { dataSources }) => {
      const genre_id = genreId ? { genreId } : {}

      const {page=1, limit=2} = pagination || {};
      const offset = (page - 1) * limit;

      return dataSources.db.song.findMany(genre_id, {
        offset: offset,
        limit: limit,
      });
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

  Mutation: {
    createSong: (_, { input }, { dataSources, userId }) => {

      if (!userId){
        throw new GraphQLError("Not authenticated");
      }
      try {
        const song = dataSources.db.song.create({
          ...input, userId,
        });
        return {
          success: true,
          song,
        };
      } catch (e) {
        console.error(e);
        throw new GraphQLError("Failed to create song");
      }
    },

    deleteSong: (_, { id }, { dataSources, userId }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        return {
          success: false,
          message: `Song ${song} not found.`,
        };
      }
      if (song.userId !== userId) {
        throw new GraphQLError("Unauthorized to delete this song.");
      }
      dataSources.db.song.delete(id);
      return {
        success: true,
        message: "Song deleted successfully",
        song: song
      };
    },

    updateSong: (_, { id, input }, { dataSources, userId }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        return {
          success: false,
          message: `Song ${song} not found.`,
        };
      }

      if (song.userId !== userId) {
        throw new GraphQLError("Unauthorized to update this song.");
      }

      try {
        const updatedSong = dataSources.db.song.update(id, {
          ...input,
          userId: input.userId !== undefined ? input.userId : song.userId,
        });
        return {
          success: true,
          message: "Song updated successfully",
          song: updatedSong
        };
      } catch(e) {
        console.error(e);
        throw new GraphQLError("Failed to update song");
      }
    },
  }

};

