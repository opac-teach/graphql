import { Resolvers } from "../types";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, {genreId, pagination}, { dataSources }) => {
        const paginationQuery = pagination || {page: 0, pageSize: 2}

        return  dataSources.db.song.findMany({genreId},{limit: paginationQuery.pageSize, offset: paginationQuery.page * paginationQuery.pageSize});
    },

    song: (_, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id);
    },
  },

  Song: {
   user : async (parent, _, { dataSources }) => {
      return dataSources.db.user.findById(parent.userId);
    },
    genre: async (parent, _, { dataSources }) => {
      return dataSources.db.genre.findById(parent.genreId);
    },
  },

  Mutation: {
      createSong: (_, { input }, { dataSources, userId }) => {
          const newSong = dataSources.db.song.create({...input, userId})
          return {
              success: true,
              song: newSong
          }
      },

      updateSong: (_, {id, input }, { dataSources, userId }) => {
          const song = dataSources.db.song.findById(id)
          if (song.userId !== userId) return {
              success: false,
              song: null
          }
          const updatedSong = dataSources.db.song.update(id, input)
          return {
              success: true,
              song: updatedSong
          }
      }
  }
};
