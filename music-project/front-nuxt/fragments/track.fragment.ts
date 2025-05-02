import {IMAGE_FRAGMENT} from "~/fragments/image.fragments";

export const TRACK_FRAGMENT = gql`
    fragment TrackField on Track {
        id
        name
        duration_ms
        track_number
        album {
            images {
                ...ImageFragment
            }
        }
        artists {
            id
            name
        }
    }
    ${IMAGE_FRAGMENT}
`

export const TRACKS_PAGINATED_FRAGMENT = gql`
    fragment TracksPaginated on PaginatedTracks {
        total
        previous
        offset
        next
        limit
        href
        items {
            track{
                ...TrackField
            }
            added_at
        }
    }
    ${TRACK_FRAGMENT}
`