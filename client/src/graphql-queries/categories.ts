import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES_QUERY = gql`
    query GetAllCategories {
        getAllCategories {
            id
            name
            ads {
                title
            }
        }
    }
`;
