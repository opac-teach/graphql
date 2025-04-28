import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";

import { typeDefs, resolvers } from "./schemas";
import {DBUser, DBSong, Database, database, DBGenre} from "./datasource";

import { getDataLoader, getForeignDataLoader } from "./FakeORM";

export type ResolversContext = {
  userId: string | null;
  userRole: string
  dataSources: {
    db: Database;
  };
  loaders: {
    users: DataLoader<string, DBUser>;
    songs: DataLoader<string, DBSong>;
    songsByUser: DataLoader<string, DBSong[]>;
    genres: DataLoader<string, DBGenre>
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
      const userRole = Array.isArray(req.headers.user_role)
        ? req.headers.user_role[0] || "ROLE_USER"
        : req.headers.user_role || "ROLE_USER"

      return {
        userId,
        userRole,
        dataSources: { db },
        loaders: {
          users: getDataLoader<DBUser>(db.user),
          songs: getDataLoader<DBSong>(db.song),
          songsByUser: getForeignDataLoader<DBSong>(db.song, "userId"),
          genres: getDataLoader<DBGenre>(db.genre)
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
