export const ADD_ITEMS = gql`
    mutation AddItems($addItemsId: String!, $playlist: PlaylistItems!) {
        addItems(id: $addItemsId, playlist: $playlist) {
            snapshot_id
        }
    } 
`