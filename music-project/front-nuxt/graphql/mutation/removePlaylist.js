export const REMOVE_PLAYLIST = gql`
    mutation RemovePlaylist($removePlaylistId: String!) {
        removePlaylist(id: $removePlaylistId) {
            success
        }
    }
`