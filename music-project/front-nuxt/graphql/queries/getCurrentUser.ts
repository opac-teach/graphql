// graphql/queries/getCurrentUser.ts
import { gql } from '@apollo/client/core'
import {ME_FRAGMENT, USER_FRAGMENT} from "~/fragments/user.fragments";

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            ...UserFields
        }
    }
    ${USER_FRAGMENT}
`

export const GET_CURRENT_USER_PROFILE = gql`
    query GetGurrentUser {
        getCurrentUser {
            ...UserMe
        }
    }
    ${ME_FRAGMENT}
`