import { Resolvers } from "../types";
import {GraphQLError} from "graphql/index";
import {z} from "zod";

const genreInputSchema = z.object({
    name: z.string().min(3).max(50)
})

export const genreResolvers: Resolvers = {
    Query: {
        genres: (_: {}, __: {}, { dataSources }) => {
            return dataSources.db.genre.findMany();
        },
        genre: (_: {}, { id }, { dataSources }) => {
            return dataSources.db.genre.findById(id);
        }
    },
    Genre: {
        songs: async (parent, { pagination }, { dataSources }) => {
            return dataSources.db.song.findMany(
                { genreId: parent.id },
                { limit: pagination?.pageSize, offset: pagination?.page }
            );
        },
        songsCount: async (parent, _: {}, { dataSources }) => {
            return dataSources.db.song.count({ genreId: parent.id });
        }
    },
    Mutation: {
        createGenre: async (_ :{}, { input }, { dataSources, userRole }) => {
            if (userRole !== 'ROLE_ADMIN') {
                throw new GraphQLError("Unauthorized", {
                    extensions: {
                        code: "UNAUTHORIZED",
                    },
                });
            }
            
            try {
                await genreInputSchema.parseAsync(input)

                const genre = dataSources.db.genre.create(input)
                return {
                    success: true,
                    genre
                }
            } catch (e) {
                throw new GraphQLError(e.message, {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }
        },
        updateGenre: async (_, { id, input }, { dataSources, userRole }) => {
            if (userRole !== 'ROLE_ADMIN') {
                throw new GraphQLError("Unauthorized", {
                    extensions: {
                        code: "UNAUTHORIZED",
                    },
                });
            }

            try {
                await genreInputSchema.parseAsync(input)

                const genreUpdated = dataSources.db.genre.update(id, input)
                return {
                    success: true,
                    genre: genreUpdated
                }
            } catch (e) {
                throw new GraphQLError(e.message, {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }
        },
        deleteGenre: (_, { id }, { dataSources, userRole }) => {
            if (userRole !== 'ROLE_ADMIN') {
                throw new GraphQLError("Unauthorized", {
                    extensions: {
                        code: "UNAUTHORIZED",
                    },
                });
            }
            dataSources.db.genre.delete(id)

            return {
                success: true
            }
        }
    }
}