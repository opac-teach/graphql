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
    songs: DataLoader<any, DBSong>;
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
        ? req.headers.user_id[0] || ""
        : req.headers.user_id || "";

      return {
        userId,
        dataSources: { db },
        loaders: {
          users: new DataLoader<string, DBUser>(() => {
            return Promise.resolve(db.user.findMany());
          }),
          songs: new DataLoader<string, DBSong>(() => {
            return Promise.resolve(db.song.findMany());
          }),
          genres: new DataLoader<string, DBGenre>(() => {
            return Promise.resolve(db.genre.findMany());
          }),
          songsByUser: new DataLoader<string, DBSong[]>((userIds: string[]) => {
            return Promise.resolve(
              userIds.map((userId) => db.song.findMany({ userId }))
            );
          }),
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
