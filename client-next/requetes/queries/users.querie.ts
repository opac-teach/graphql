import { gql } from "@/lib/graphql";

export const GET_USERS = gql(`
  query Users {
    users {
      id
      name
      email
    }
  }
`);

export const GET_USER = gql(`
  query User($id: String!) {
    user(id: $id) {
      id
      email
      name
      songs {
        id
        name
        genre {
          id
          name
        }
      }
    }
  }
`);
