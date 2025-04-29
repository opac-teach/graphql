import { Resolvers } from "../types";
import {GraphQLError} from "graphql/error";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { limit, offset }, { dataSources }) => {
      return dataSources.db.user.findMany(undefined ,{ limit, offset });
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
  },
  Mutation: {
    createUser: (_, { input }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError(
            "You must be logged in to perform this action.",
            {
              extensions: {
                code: "FORBIDDEN",
              },
            }
        );
      }
      const user = dataSources.db.user.create(input);
      return {
        success: true,
        user,
      };
    },

    updateUser: (_, { id, input }, { dataSources, userId }) => {
      const user = dataSources.db.user.update(id, input);
      if (!userId) {
          throw new GraphQLError(
              "You must be logged in to perform this action.",
              {
              extensions: {
                  code: "FORBIDDEN",
              },
              }
          );
      }
      return {
        success: true,
        user,
      };
    },

    deleteUser: (_, { id }, { dataSources, userId }) => {
      if (!userId) {
        throw new GraphQLError(
            "You must be logged in to perform this action.",
            {
              extensions: {
                code: "FORBIDDEN",
              },
            }
        );
      }
      const user=  dataSources.db.user.findById(id);
      if (userId == user.id) {
        dataSources.db.song.delete(id);
      }
      return {
        success: true,
        user,
      };
    },
  },
};
