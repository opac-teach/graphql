import { Resolvers } from "../types";
import { GraphQLError } from "graphql";

export const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => {
      return dataSources.db.genre.findMany();
    },
    genre: (_, { id }, { dataSources }) => {
      return dataSources.db.genre.findById(id);
    }
  },
  Genre: {
    songs: (parent, _, { dataSources }) => {
      return dataSources.db.song.findMany({ genreId: parent.id });
    },
    songsCount: (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ genreId: parent.id });
    },
  },
  Mutation: {
    createGenre: (_, { input }, { dataSources }) => {
      if (!input.name || input.name.trim() === "") {
        throw new GraphQLError("Genre name is required");
      }

      return dataSources.db.genre.create({
        name: input.name.trim(),
      });
    },
  },
};