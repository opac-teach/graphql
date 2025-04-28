import { genres } from "./mock-data";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";

import { typeDefs, resolvers } from "./schemas";
import { DBUser, DBSong, Database, database, DBGenre } from "./datasource";

import { getDataLoader, getForeignDataLoader } from "./FakeORM";

export type ResolversContext = {
  userId: string | null;
  dataSources: {
    db: Database;
  };
  loaders: {
    users: DataLoader<string, DBUser>;
    genres: DataLoader<string, DBGenre>;
    songs: DataLoader<string, DBSong>;
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
          users: getDataLoader<DBUser>(db.user),
          genres: getDataLoader<DBGenre>(db.genre),
          songs: getDataLoader<DBSong>(db.song),
          songsByUser: getForeignDataLoader<DBSong>(db.song, "userId"),
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
