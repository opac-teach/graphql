import type { CodegenConfig } from "@graphql-codegen/cli";
import { Genre } from './src/types';

const config: CodegenConfig = {
  schema: "./src/**/*.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./index#ResolversContext",
        mappers: {
          User: "./datasource#DBUser",
          Song: "./datasource#DBSong",
          Genre: "./datasource#DBGenre",
        },
        useIndexSignature: true,
      },
    },
  },
};

export default config;
