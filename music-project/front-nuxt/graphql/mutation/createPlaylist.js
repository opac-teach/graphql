export const CREATE_PLAYLIST = gql`
    mutation Mutation($playlist: PlaylistMutation!) {
      createPlaylist(playlist: $playlist) {
        id
      }
    }
`