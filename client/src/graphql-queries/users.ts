import { gql } from "@apollo/client";

export const LOGI = gql`
    query Login($email: String!, $password: String!) {
        login(userData: { email: $email, password: $password })
    }
`;

export const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
        register(userData: { email: $email, password: $password }) {
            id
            email
            role
        }
    }
`;
