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

export const UPDATE_SONG = gql(`
    mutation UpdateSong($input: UpdateSongInput!, $updateSongId: ID!) {
        updateSong(input: $input, id: $updateSongId) {
            success
            song {
                name
                user {
                    name
                }
            }
        }
}   
`);

export const DELETE_SONG = gql(`
    mutation DeleteSong($deleteSongId: ID!) {
        deleteSong(id: $deleteSongId) {
            success
            id
        }
    }
`);
