export const SEARCH_TRACKS = gql`
    query SearchTracks($value: String!) {
        searchTracks(value: $value) {
            tracks {
                items {
                    id
                    uri
                    name
                    album {
                        images {
                            url
                        }
                    }
                    artists {
                        id
                        name
                    }
                }
            }
        }
    }
`