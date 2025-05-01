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

export const DELETE_GENRE = gql(`
    mutation DeleteGenre($deleteGenreId: ID!) {
        deleteGenre(id: $deleteGenreId) {
            success
            id
        }
}
`);
