import { gql } from "@/lib/graphql";

export const CREATE_SONG = gql(`
    mutation CreateSong($input: CreateSongInput!) {
        createSong(input: $input) {
            success
            song {
            id
            name
            user {
                id
                name
            }
            genre {
                id
                name
            }
            }
        }
    } 
`);
