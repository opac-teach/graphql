import {PLAYLIST_FRAGMENT} from "~/fragments/playlist.fragment";
import {TRACKS_PAGINATED_FRAGMENT} from "~/fragments/track.fragment";

export const GET_PLAYLIST = gql`
    query GetPlaylist($getPlaylistId: String!, $limit: Int, $page: Int) {
        getPlaylist(id: $getPlaylistId) {
            ...PlaylistFields
            tracksPaginated(limit: $limit, page: $page) {
                ...TracksPaginated
            }
        }
    }
    ${PLAYLIST_FRAGMENT}
    ${TRACKS_PAGINATED_FRAGMENT}
`