import { gql } from "@/lib/graphql";

export const CREATE_USER = gql(`
  mutation CreateUser($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      name
    }
  }
`);
