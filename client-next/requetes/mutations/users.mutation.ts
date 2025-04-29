import { gql } from "@/lib/graphql";

export const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      user {
        id
        name
      }
    }
  }
`);
