import { gql } from "@/lib/graphql";

export const GET_USERS = gql(`
  query Users {
    users {
      id  
      name
    }
  }
`);

export const GET_USER = gql(`
  query User($id: ID!) {
    user(id: $id) {
      id  
    name
    songsCount
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
    songsCount
  }
`);
