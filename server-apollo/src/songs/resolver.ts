import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import { Buffer } from "buffer";
import { getDataLoader, getForeignDataLoader } from "../FakeORM";
import DataLoader from "dataloader";

const encodeCursor = (index: number): string =>
  Buffer.from(`cursor:${index}`).toString("base64");

const decodeCursor = (cursor: string): number => {
  try {
    return parseInt(Buffer.from(cursor, "base64").toString("utf8").split(":")[1]);
  } catch {
    return 0;
  }
};

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, {genreId}, { dataSources }) => {
      return dataSources.db.song.findMany({genreId});
    },
    song: (_, { id }, { dataSources }) => {
      const song = dataSources.db.song.findById(id);
      if (!song) {
        throw new GraphQLError(`Song with id ${id} not found`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return song;
    },
    songsConnection: (_, { first = 5, after }, { dataSources }) => {
      const allSongs = dataSources.db.song.findMany();
      const startIndex = after ? decodeCursor(after) + 1 : 0;
      const sliced = allSongs.slice(startIndex, startIndex + first);

      return {
        edges: sliced.map((song, i) => ({
          node: song,
          cursor: encodeCursor(startIndex + i),
        })),
        pageInfo: {
          endCursor:
            sliced.length > 0
              ? encodeCursor(startIndex + sliced.length - 1)
              : null,
          hasNextPage: startIndex + sliced.length < allSongs.length,
        },
      };
    },
  },
  Song: {
    user: (parent, _, { loaders }) => {
      return loaders.users.load(parent.userId);
    },
    genre: async (parent, _, { loaders }) => {
      const genre = await loaders.genres.load(parent.genreId);
    
      if (!genre) {
        throw new GraphQLError(`Genre not found for song with genreId: ${parent.genreId}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    
      return genre;
    },
  },
  Mutation: {
    createSong: (_, { input }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized: You must be logged in to create a song");
      }
  
      const newSong = dataSources.db.song.create({
        name: input.name,
        userId: user.id,
        genreId: input.genreId,
      });
      return newSong;
    },
    updateSong: (_, { input }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized: You must be logged in to update a song");
      }
    
      const existingSong = dataSources.db.song.findById(input.id);
      if (!existingSong) {
        throw new GraphQLError("Song not found");
      }
    
      if (existingSong.userId !== user.id) {
        throw new GraphQLError("Forbidden: You can only update your own songs");
      }
    
      const updatedSong = dataSources.db.song.update(input.id, {
        name: input.name ?? existingSong.name,
        genreId: input.genreId ?? existingSong.genreId,
      });
    
      return updatedSong;
    },
    deleteSong: (_, { id }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized: You must be logged in to delete a song");
      }
    
      const existingSong = dataSources.db.song.findById(id);
      if (!existingSong) {
        throw new GraphQLError("Song not found");
      }
    
      if (existingSong.userId !== user.id) {
        throw new GraphQLError("Forbidden: You can only delete your own songs");
      }
    
      dataSources.db.song.delete(id);
      return true;
    },
  },  
};
