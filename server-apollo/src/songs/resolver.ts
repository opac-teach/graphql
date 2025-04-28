import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import {DBSong} from "../datasource";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId }, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId });
    },
    song: (_: {}, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id)
    }
  },
  Song: {
    user: async (parent: DBSong, _ : {}, { dataSources }): Promise<any> => {
      return dataSources.db.user.findById(parent.userId)
    },
    genre: async (parent: DBSong, _ : {}, { dataSources }): Promise<any> => {
      return dataSources.db.genre.findById(parent.genreId)
    }
  },
  Mutation: {
    createSong: (_:{}, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const song = dataSources.db.song.create({
        name: input.name,
        genreId: input.genreId,
        userId: userId
      })
      return {
        success: true,
        song
      }
    },
    updateSong: (_, { id, input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const song = dataSources.db.song.findById(id);

      if (!song) {
        throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      }

      if (song.userId !== userId) {
        throw new GraphQLError("Forbidden", { extensions: { code: "FORBIDDEN" } });
      }

      const songUpdated = dataSources.db.song.update(id, input);

      return {
        success: true,
        song: songUpdated
      };
    },
    deleteSong: (_, { id }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const song = dataSources.db.song.findById(id);

      if (!song) {
        throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      }

      if (song.userId !== userId) {
        throw new GraphQLError("Forbidden", { extensions: { code: "FORBIDDEN" } });
      }

      dataSources.db.song.delete(id);

      return {
        success: true
      }
    }
  }
}
