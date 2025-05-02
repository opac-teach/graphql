import { Resolvers } from "../types";

export const genreResolvers: Resolvers = {
    Query: {
        genres: (_, __, { dataSources }) => {
            return dataSources.db.genre.findMany();
        },
        genre: (_, { id }, { dataSources }) => {
            return dataSources.db.genre.findById(id);
        },
    },
    Genre: {
        songs: async (parent, { limit }, { dataSources }) => {
            return dataSources.db.song.findMany({ genreId: parent.id }, { limit });
        },
        songCount: async (parent, _, { dataSources }) => {
            return dataSources.db.song.count({ genreId: parent.id });
        }
    },
    Mutation: {
        createGenre: (_, { input }, { dataSources, userId }) => {
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const genre = dataSources.db.genre.create(input);
            return {
                success: true,
                genre,
            };
        },
        updateGenre: (_, { id, input }, { dataSources, userId }) => {
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const genre = dataSources.db.genre.update(id, input);
            return {
                success: true,
                genre,
            };
        }
    },
};


