import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs, resolvers } from "./schemas";
import { Database, database } from "./datasource";

export type ResolversContext = {
  userId: string | null;
  dataSources: {
    db: Database;
  };
  loaders: {
    song: ReturnType<Database["song"]["createLoader"]>;
    user: ReturnType<Database["user"]["createLoader"]>;
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

      const songLoader = db.song.createLoader();
      const userLoader = db.user.createLoader();

      return {
        userId,
        dataSources: { db },
        loaders: {
          song: songLoader,
          user: userLoader,
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
