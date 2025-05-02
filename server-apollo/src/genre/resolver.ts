import { DBSong } from "../datasource";
import { Resolvers } from "../types";
//import { ResolversContext, MutationCreateGenreArgs } from "../types"; 
//import { DBGenre, DBSong } from "../types"; // Adapte selon ta structure

export const genreResolvers: Resolvers = {
  Query: {
    genres: async (_, __, { dataSources }) => {
      const genres = dataSources.db.genre.findMany();

      return genres.map((genre: { id: string; name: string }) => ({
        id: genre.id,
        name: genre.name,
        songs: [] as DBSong[],
      }));
    },
    genre: async (_, { id }, { dataSources }) => {
      const genre = await dataSources.db.genre.findById(id);
    
      if (!genre) return null;
    
      return {
        id: genre.id,
        name: genre.name,
        songs: await dataSources.db.song.findMany({ genreId: genre.id }),
      };
    },
    
  },

  Genre: {
    songs: (parent, { limit, offset }, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ genreId: parent.id });
      return songs.slice(offset || 0, (offset || 0) + (limit || songs.length));
    },

    songsCount: async (parent: { id: string }, _, { dataSources }) => {
      
      return await dataSources.db.song.count({ genreId: parent.id });
    },
  },

  Mutation: {
    createGenre: (_, { input }, { dataSources,role}) => {
      if (role !== "ADMIN") {
        throw new Error("Forbidden: Admins only");
      }
      const createdGenre = dataSources.db.genre.create(input);
      return {
        success: true,
        genre: {
          id: createdGenre.id,
          name: createdGenre.name,
          songs: [], 
        },
      };
    },
  }
};


