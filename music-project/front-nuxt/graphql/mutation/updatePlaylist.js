export const UPDATE_PLAYLIST = gql`
    mutation UpdatePlaylist($updatePlaylistId: String!, $playlist: PlaylistMutation!) {
        updatePlaylist(id: $updatePlaylistId, playlist: $playlist) {
            id
            name
            description
        }
    }
`