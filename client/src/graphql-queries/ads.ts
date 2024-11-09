import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
    query GetAllAds {
        getAllAds {
            id
            title
            description
            price
            picture
            category {
                name
            }
            tags {
                name
            }
        }
    }
`;

export const GET_AD_QUERY = gql`
    query GetAd($id: Float!) {
        getAd(id: $id) {
            id
            title
            description
            price
            picture
            category {
                name
            }
            tags {
                name
            }
        }
    }
`;

export const PUBLISH_AD_MUTATION = gql`
    mutation PublishAd($title: String!, $price: Float!, $category: String!) {
        publishAd(
            adData: { title: $title, price: $price, category: $category }
        ) {
            id
        }
    }
`;
