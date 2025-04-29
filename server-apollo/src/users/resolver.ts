import { GraphQLError } from "graphql";
import { Resolvers } from "../types";
import { ResolversContext } from "../index";


export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit, offset }, { dataSources }) => {
      const allUsers = dataSources.db.user.findMany();
      const start = offset ?? 0;
      const end = limit != null ? start + limit : undefined;
      return allUsers.slice(start, end);
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, { limit, offset }, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ userId: parent.id });
      return songs.slice(offset || 0, (offset || 0) + (limit || songs.length));
    },
    songsCount: (parent, _, { dataSources }) => {
      const songs = dataSources.db.song.findMany({ userId: parent.id });
      return songs.length;
    },
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      const user = dataSources.db.user.create(input);
      return {
        success: true,
        user,
      };
    },
    updateUser: (
      _: unknown,
      { id, input }: { id: string; input: { name?: string } },
      { userId, dataSources }: ResolversContext
    ) => {
      if (id !== userId) {
        throw new GraphQLError("Non authorizé: tu ne peux pas modifier le profil des autres !!");
      }

      const user = dataSources.db.user.findById(id);
      if (!user) {
        return { success: false, user: null, message: "User n'existe pas!!" };
      }

      const updated = dataSources.db.user.update(id, input);
      return { success: true, user: updated, message: "User modifié!!" };
    },

    deleteUser: (_, { id }, { userId, dataSources }) => {
      const user = dataSources.db.user.findById(id);
      if (!user) {
        throw new GraphQLError("User n'existe pas!!");
      }
      if (user.id !== userId) {
        throw new GraphQLError("Non authorizé!!");
      }
      
      dataSources.db.user.delete(id);
      return { success: true };
    }
  },
};
