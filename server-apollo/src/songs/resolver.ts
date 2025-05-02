import { GraphQLError } from "graphql";
import { QuerySongsArgs, Resolvers } from "../types";
import { ResolversContext } from "../index"

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, args, { dataSources }) => {
      const { genreId, limit, offset } = args;
      let allSongs = dataSources.db.song.findMany();
    
      if (genreId) {
        allSongs = allSongs.filter((song) => song.genreId === genreId);
      }
    
      return allSongs.slice(offset || 0, (offset || 0) + (limit || allSongs.length));
    },
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
  },
    
  },

  Song: {
    user: (parent, _, { loaders }) => {
      return loaders.users.load(parent.userId);
    },

    genre: async (parent, _, { dataSources }) => {
      const genre = await dataSources.db.genre.findById(parent.genreId);
      console.log("Genre ID:", parent.genreId);
      console.log("Retrieved genre:", genre);
      if (!genre) {
        throw new Error(`Genre not found for genreId: ${parent.genreId}`);
      }
      return genre;
    },
  

  
},

Mutation: {
  createSong: async (_, { input }, { dataSources,userId }) => {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const createdSong = await dataSources.db.song.create({
      name: input.name,
      genreId: input.genreId,
      userId: userId,
    });

    return {
      success: true,
      song: createdSong,
    };
  },

  updateSong: async (  _: unknown,
  args: { id: string; input: { name: string; genreId: string } },
  { dataSources, userId }: ResolversContext
) => {
  const { id, input } = args;
    if (!userId) throw new Error("Unauthorized");
  
    const song = await dataSources.db.song.findById(id);
    if (!song) throw new Error("Song not found");
  
   
    if (song.userId !== userId) throw new Error("Forbidden");
  
   
    const updatedSong = await dataSources.db.song.update(id, {
      name: input.name,
      genreId: input.genreId,
    });
  
    return {
      success: true,
      song: updatedSong,
    };
  },

  deleteSong: async (
    _: unknown,
    args: { id: string },
    { dataSources, userId }: ResolversContext
  ) => {
    const { id } = args;
    if (!userId) throw new Error("Unauthorized");
  
    const song = await dataSources.db.song.findById(id);
    if (!song) throw new Error("Song not found");
  
    if (song.userId !== userId) throw new Error("Forbidden");
  
    await dataSources.db.song.delete(id);
  
    return { success: true };
  },
},


  
};
