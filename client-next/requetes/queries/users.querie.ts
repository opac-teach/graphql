import { gql } from "@/lib/graphql";

export const GET_USERS = gql(`
  query Users {
    users {
      ...userFragment
    }
  }
`);

export const GET_USER = gql(`
  query User($id: ID!) {
    user(id: $id) {
      ...userFragment
      songs {
        id
        name
      }
    }
  }
`);

export const FRAGMENT = gql(`
  fragment userFragment on User {
    id  
    name
  }
`);
