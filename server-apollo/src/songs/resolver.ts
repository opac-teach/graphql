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
  }
}
