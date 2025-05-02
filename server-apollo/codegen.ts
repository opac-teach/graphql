import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/**/*.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./index#ResolversContext",
        mappers: {
          Genre: "./datasource#DBGenre",
          User: "./datasource#DBUser",
          Song: "./datasource#DBSong",
        },
        useIndexSignature: true,
      },
    },
  },
};

export default config;
