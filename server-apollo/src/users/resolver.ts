import { GraphQLError } from "graphql";
import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.db.user.findMany();
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: async (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ userId: parent.id });
    },
    songsCount: async (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ userId: parent.id });
    },
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      try {
        const user = dataSources.db.user.create(input);
        return {
          success: true,
          user,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the create.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
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

      if (userId !== id) {
        throw new GraphQLError(
          "You must be logged in with the user you wish to delete.",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }

      try {
        dataSources.db.song.findMany({ userId: id}).forEach((song) => {
          dataSources.db.song.delete(song.id);
        });
  
        dataSources.db.user.delete(id);

        return {
          success: true,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the delete.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
    },
    updateUser: (_, { id, input}, { dataSources, userId }) => {
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

      const userToUpdate = dataSources.db.user.findById(id);

      if (!userToUpdate) {
        throw new GraphQLError(
          "User not found.",
          {
            extensions: {
              code: "NOT FOUND",
            },
          }
        );
      }

      if (userId !== userToUpdate.id) {
        throw new GraphQLError(
          "You must be logged in with the user you wish to update.",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }

      try {      
        const user = dataSources.db.user.update(id, input);

        return {
          success: true,
          user,
        };
      } catch {
        throw new GraphQLError(
          "An error occurred during the update.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
    },
  },
};
