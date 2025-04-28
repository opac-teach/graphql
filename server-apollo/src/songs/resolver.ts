import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import DataLoader from "dataloader";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { limit, page }, { dataSources }) => {
      return dataSources.db.song.findMany(undefined, {
        limit: limit,
        offset: page,
      });
    },
    songById: (_, { id }, { dataSources }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        throw new GraphQLError("Song not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return song;
    },
    songsWithUsers: async (_, __, { dataSources, loaders }) => {
      const songs = dataSources.db.song.findMany();
      return Promise.all(
        songs.map(async (song) => {
          const user = await loaders.users.load(song.userId);
          return {
            ...song,
            user,
          };
        })
      );
    },
  },
  Song: {
    user: async (parent, _, { dataSources }) => {
      const user = dataSources.db.user.findById(parent.userId);
      return user;
    },
  },
  Mutation: {
    createSong: (__, { input }, { dataSources, userId }) => {
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
    editSong: (__, { id, input }, { dataSources, userId }) => {
      try {
        const { name, genreId } = input;

        if (!userId) {
          return {
            song: null,
            error: "User ID not provided in headers",
          };
        }

        const existingSong = dataSources.db.song.findById(id);

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

        const song = dataSources.db.song.update(id, {
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
