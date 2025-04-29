import { gql } from "@/lib/graphql";

export const GET_USERS = gql(`
  query Users {
    users {
      id
      name
    }
  }
`);
