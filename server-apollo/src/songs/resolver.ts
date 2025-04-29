import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
<<<<<<< Updated upstream
import DataLoader from "dataloader";
import { off } from "process";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { limit, page }, { dataSources }) => {
      console.log("Loading songs...");
      const songs = dataSources.db.song.findMany(
        {},
        {
          limit,
          offset: (page - 1) * limit,
        }
      );

      return songs;
    },
    song: (_, { id }, { dataSources }) => {
      const song = dataSources.db.song.findById(id);
      console.log("Loading song...");
      console.log(song);
=======

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
    songById: async (_, { id }, { dataSources, loaders }) => {
      const song = await dataSources.db.song.findById(loaders.song, id);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      return await loaders.users.load(parent.userId);
    },
    genre: async (parent, _, { dataSources, loaders }) => {
      const genre = await dataSources.db.genre.findById(parent.genreId);
      if (!genre) {
        throw new GraphQLError("Genre not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return genre;
=======
      return dataSources.db.user.findById(loaders.user, parent.userId);
>>>>>>> Stashed changes
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
