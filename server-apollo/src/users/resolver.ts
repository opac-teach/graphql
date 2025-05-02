import { Resolvers } from "../types";
import {GraphQLError} from "graphql";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, {pagination}, { dataSources }) => {

      const {page=1, limit=10} = pagination || {};
      const offset = (page - 1) * limit;
      return dataSources.db.user.findMany(_,{
        limit: limit,
        offset: offset,
      });
    },

    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, {pagination}, { dataSources }) => {
      const {page=1, limit=10} = pagination || {};
      const offset = (page - 1) * limit;
      return dataSources.db.song.findMany({ userId: parent.id }, {
        offset: offset,
        limit: limit,
      });
    },

    songCount: async (parent, _, { dataSources }) => {
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

    deleteUser: (_, { id }, { dataSources, userId }) => {
      const user = dataSources.db.user.findById(id);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      if (userId !== id){
        throw new GraphQLError("Unauthorized to delete this user");
      }

      dataSources.db.user.delete(id);
      return {
        success: true,
        message: "User deleted successfully",
      };
    },
    updateUser: (_, { id, input }, { dataSources, userId }) => {
      const user = dataSources.db.user.findById(id);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      if (userId !== id){
        throw new GraphQLError("Unauthorized to update this user");
      }

      const updatedUser = dataSources.db.user.update(id, {
        ...input
      });
      return {
        success: true,
        user: updatedUser,
      };
    },
  },

};
