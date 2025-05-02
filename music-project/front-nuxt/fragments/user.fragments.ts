import { gql } from '@apollo/client/core'
import {IMAGE_FRAGMENT} from "~/fragments/image.fragments";
import {PLAYLIST_FRAGMENT} from "~/fragments/playlist.fragment";


export const USER_FRAGMENT = gql`
    fragment UserFields on User {
        id
        display_name
        email
        images {
            ...ImageFragment
        }
        playlists {
            total
            items {
                ...PlaylistFields
            }
        }
    }
    ${PLAYLIST_FRAGMENT}
    ${IMAGE_FRAGMENT}
`

export const OWNER_FRAGMENT = gql`
    fragment OwnerField on User {
        id
        display_name
        images {
            url
        }
    }
`

export const ME_FRAGMENT = gql`
    fragment UserMe on User {
        id
        display_name
        email
        images {
            ...ImageFragment
        }
    }
    ${IMAGE_FRAGMENT}
`