import { gql } from "@/lib/graphql";

export const CREATE_GENRE = gql(`
    mutation CreateGenre($input: CreateGenreInput!) {
        createGenre(input: $input) {
            success
            genre {
                id
                name
            }
        }
    }    
`);
