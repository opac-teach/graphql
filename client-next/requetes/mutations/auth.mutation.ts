import { gql } from "@/lib/graphql";

export const LOGIN = gql(`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      message
    }
  }
`);

export const LOGOUT = gql(`
  mutation Logout {
    logout {
        message
        success
    }
}
`);
