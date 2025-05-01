import { gql } from "@/lib/graphql";

export const ME = gql(`
  query Me {
    me {
      id
      name
      email
    }
  }
`);
