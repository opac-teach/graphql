import { Resolvers } from "../types";
import { GraphQLError } from "graphql";
import { Buffer } from "buffer";

const encodeCursor = (index: number) => Buffer.from(`cursor:${index}`).toString("base64");
const decodeCursor = (cursor: string) =>
  parseInt(Buffer.from(cursor, "base64").toString("ascii").split(":")[1]);

export const userResolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.db.user.findMany();
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
    usersConnection: (_, { first = 5, after }, { dataSources }) => {
      const allUsers = dataSources.db.user.findMany();
      const startIndex = after ? decodeCursor(after) + 1 : 0;
      const slice = allUsers.slice(startIndex, startIndex + first);

      return {
        edges: slice.map((user, i) => ({
          node: user,
          cursor: encodeCursor(startIndex + i),
        })),
        pageInfo: {
          endCursor: encodeCursor(startIndex + slice.length - 1),
          hasNextPage: startIndex + slice.length < allUsers.length,
        },
      };
    },
  },
  User: {
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
    songsCount: (parent, _, { dataSources }) => {
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
    updateUser: (_, { input }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized: You must be logged in to update a user");
      }
    
      if (input.id !== user.id) {
        throw new GraphQLError("Forbidden: You can only update your own profile");
      }
    
      const existingUser = dataSources.db.user.findById(input.id);
      if (!existingUser) {
        throw new GraphQLError("User not found");
      }
    
      const updatedUser = dataSources.db.user.update(input.id, {
        name: input.name ?? existingUser.name,
      });
    
      return updatedUser;
    },
    deleteUser: (_, { id }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized: You must be logged in to delete a user");
      }
    
      if (id !== user.id) {
        throw new GraphQLError("Forbidden: You can only delete your own account");
      }
    
      const existingUser = dataSources.db.user.findById(id);
      if (!existingUser) {
        throw new GraphQLError("User not found");
      }
    
      dataSources.db.user.delete(id);
      return true;
    },
  },
};
