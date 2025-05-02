import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: async (_, { genreId,pagination  }, { dataSources }) => {
      const allSongs = await dataSources.db.song.findMany();
      const sortedSongs = allSongs.sort((a, b) => a.id.localeCompare(b.id));
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const offset = (page - 1) * pageSize;
      if (!genreId) { 
        return sortedSongs.slice(offset, offset + pageSize);;
      }
      return sortedSongs.filter(song => song.genreId === genreId);
    },
    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },  
    Song: {
      user: async (parent, _, { dataSources }) => {
        return dataSources.db.user.findById(parent.userId);
      },
      genres: async (parent, _, { dataSources }) => {
        return dataSources.db.genre.findById(parent.genreId);
      },
  },
  Mutation: {
    createSong: (_, { input }, { dataSources }) => {

      const song = dataSources.db.song.create(input);
      
      return {
        success: true,
        song,
        
      };
    },
    updateSong: (_, { input }, { dataSources, userId}) => {
      const song = dataSources.db.song.update(userId,input);
      return{
        success: true,
        song,
      }
    },
    deleteSong: (_, {input}, { dataSources, userId }) => {
      const song = dataSources.db.song.findById(userId);
      if (!song) throw new Error("song not found");
      dataSources.db.song.delete(userId);
      return {
        success: true,
        song,
      }
    },
  },
};
