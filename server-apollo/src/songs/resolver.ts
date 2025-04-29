import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import {DBSong} from "../datasource";
import {z} from "zod";

const songInputSchema = z.object({
  name: z.string().min(3).max(100),
  genreId: z.string()
})

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, { genreId, pagination }, { dataSources }) => {
      return dataSources.db.song.findMany(
          { genreId },
          { offset: pagination?.page, limit: pagination?.pageSize }
      );
    },
    song: (_: {}, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id)
    }
  },
  Song: {
    user: async (parent: DBSong, _ : {}, { loaders }): Promise<any> => {
      return loaders.users.load(parent.userId)
    },
    genre: async (parent: DBSong, _ : {}, { loaders }): Promise<any> => {
      return loaders.genres.load(parent.genreId)
    }
  },
  Mutation: {
    createSong: async (_:{}, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      try {
        await songInputSchema.parseAsync(input);

        const song = dataSources.db.song.create({
          name: input.name,
          genreId: input.genreId,
          userId: userId
        })
        return {
          success: true,
          song
        }
      } catch (e) {
        throw new GraphQLError(e.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },
    updateSong: async (_, { id, input }, { dataSources, userId }) => {
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

      try {
        await songInputSchema.parseAsync(input)

        const songUpdated = dataSources.db.song.update(id, input);
        return {
          success: true,
          song: songUpdated
        };
      } catch (e) {
        throw new GraphQLError(e.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
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
