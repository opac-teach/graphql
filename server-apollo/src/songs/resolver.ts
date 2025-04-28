import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import {DBSong} from "../datasource";

export const songResolvers: Resolvers = {
  Query: {
    songs: (_, __, { dataSources }) => {
      return dataSources.db.song.findMany();
    },
    song: (_: {}, { id }, { dataSources }) => {
      return dataSources.db.song.findById(id)
    }
  },
  Song: {
    user: async (parent: DBSong, _ : {}, { dataSources }): Promise<any> => {
      return dataSources.db.user.findById(parent.userId)
    }
  }
}
