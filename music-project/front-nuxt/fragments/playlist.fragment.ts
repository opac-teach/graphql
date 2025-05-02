import { gql } from '@apollo/client/core'
export const PLAYLIST_FRAGMENT = gql`
    fragment PlaylistFields on Playlist {
        id
        name
        description
        images {
            url
        }
        tracks {
            total
        }
        owner {
            id
            display_name
            images {
                url
            }
        }
    }
`