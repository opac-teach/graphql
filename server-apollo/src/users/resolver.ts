import { ResolversContext } from "../index";
import { Resolvers } from "../types";

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

    songsCount: async (parent: { id: string }, _, { dataSources }) => {
      return dataSources.db.song.count({ userId: parent.id });
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

    updateUser: async (_: unknown,
      args: { id: string; input: { name?: string; email?: string } },
      { dataSources, userId }: ResolversContext
    ) => {
      const { id, input } = args;
      if (!userId) throw new Error("Unauthorized");
      if (id !== userId) throw new Error("Forbidden");
    
      const updatedUser = dataSources.db.user.update(id, input);
      return {
        success: true,
        user: updatedUser,
      };
    },
    
  },

  /*deleteUser: async (
    _: unknown,
    { id }: { id: string },
    context: GraphQLContext
  ) => {
    const { user, dataSources } = context;

    if (user.role !== "ADMIN" && user.id !== id) {
      throw new Error("Forbidden: You can only delete your own account");
    }

    return await dataSources.db.user.delete(id);
  },*/
};
