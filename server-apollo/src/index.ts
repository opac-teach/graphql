import { ApolloServer } from "@apollo/server";
import DataLoader from "dataloader";

import { typeDefs, resolvers } from "./schemas";
import { DBUser, DBSong, Database, database } from "./datasource";

import { getDataLoader, getForeignDataLoader } from "./FakeORM";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/dist/use/ws";
import bodyParser from "body-parser";

export type ResolversContext = {
  userId: string | null;
  dataSources: {
    db: Database;
  };
  loaders: {
    users: DataLoader<string, DBUser>;
    songs: DataLoader<string, DBSong>;
    songsByUser: DataLoader<string, DBSong[]>;
  };
};

async function startApolloServer() {
  const db: Database = database;

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer(
    {
      schema,
      context: async (): Promise<ResolversContext> => {
        console.log("-- New request");

        const userId = "";

        return {
          userId,
          dataSources: { db },
          loaders: {
            users: getDataLoader<DBUser>(db.user),
            songs: getDataLoader<DBSong>(db.song),
            songsByUser: getForeignDataLoader<DBSong>(db.song, "userId"),
          },
        };
      },
    },
    wsServer
  );

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use("/graphql", bodyParser.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log(`
      🚀  Server is running!
      📭  Query at http://localhost:4000/graphql
    `);
  });
}

startApolloServer();
