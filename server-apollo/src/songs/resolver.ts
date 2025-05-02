import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { limit, page }, { dataSources, loaders }) => {
      return dataSources.db.song.findMany(
        loaders.song,
        {},
        {
          limit,
          offset: page,
        }
      );
    },
    song: async (_, { id }, { dataSources, loaders }) => {
      const song = await dataSources.db.song.findById(loaders.song, id);
      if (!song) {
        throw new GraphQLError("Song not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return song;
    },
  },
  Song: {
    user: async (parent, _, { dataSources, loaders }) => {
      return dataSources.db.user.findById(loaders.user, parent.userId);
    },
  },
  Mutation: {
    createSong: async (__, { input }, { dataSources, userId }) => {
      try {
        const { name, genreId } = input;

        if (!userId) {
          return {
            song: null,
            error: "User ID not provided in headers",
          };
        }

        const song = dataSources.db.song.create({
          name,
          genreId,
          userId,
        });

        return {
          song,
          error: null,
        };
      } catch (error) {
        return {
          song: null,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
    editSong: async (__, { id, input }, { dataSources, userId, loaders }) => {
      try {
        const { name, genreId } = input;

        if (!userId) {
          return {
            song: null,
            error: "User ID not provided in headers",
          };
        }

        const existingSong = await dataSources.db.song.findById(
          loaders.song,
          id
        );

        if (!existingSong) {
          return {
            song: null,
            error: "Song not found",
          };
        }

        if (existingSong.userId !== userId) {
          return {
            song: null,
            error: "You are not authorized to edit this song",
          };
        }

        const song = await dataSources.db.song.update(id, {
          name,
          genreId,
        });

        return {
          song,
          error: null,
        };
      } catch (error) {
        return {
          song: null,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
  },
};
