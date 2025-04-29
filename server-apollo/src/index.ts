import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";

import { typeDefs, resolvers } from "./schemas";
import { DBUser, DBSong, DBGenre, Database, database } from "./datasource";

export type ResolversContext = {
  userId: string | null;
  dataSources: {
    db: Database;
  };
  loaders: {
    users: DataLoader<string, DBUser>;
    songs: DataLoader<string, DBSong>;
    genres: DataLoader<string, DBGenre>;
    songsByUser: DataLoader<string, DBSong[]>;
  };
};

async function startApolloServer() {
  const server = new ApolloServer<ResolversContext>({
    typeDefs,
    resolvers,
  });

  const db: Database = database;

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }): Promise<ResolversContext> => {
      console.log("-- New request");

      const userId = Array.isArray(req.headers.user_id)
        ? req.headers.User[0] || ""
        : req.headers.user_id || "";

      return {
        userId,
        dataSources: { db },
        loaders: {
          users: new DataLoader<string, DBUser>(
            async (userIds: readonly string[]) => {
              const foundUsers = db.user.findByIds(userIds as string[]);
              return userIds.map(
                (id) => foundUsers.find((u) => u.id === id) ?? null
              );
            }
          ),
          songs: new DataLoader<string, DBSong>(async (songIds: string[]) => {
            const allSongs = db.song.findByIds(songIds);
            return songIds.map(
              (id) => allSongs.find((song) => song.id === id) || null
            );
          }),
          genres: new DataLoader<string, DBGenre>(() => {
            return Promise.resolve(db.genre.findMany());
          }),
          songsByUser: new DataLoader<string, DBSong[]>(
            async (userIds: readonly string[]) => {
              const foundSongs = db.song.findMany(
                userIds.map((id) => ({ userId: id }))
              );
              return userIds.map((userId) =>
                foundSongs.filter((song) => song.userId === userId)
              );
            }
          ),
        },
      };
    },
  });

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
