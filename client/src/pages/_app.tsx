import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Login from "@/components/Login";

import "../styles/globals.css";

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("authToken");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token: string | null = localStorage.getItem("authToken");
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    return (
        <ApolloProvider client={client}>
            <Layout>{isAuth ? <Component {...pageProps} /> : <Login />}</Layout>
        </ApolloProvider>
    );
}

// Désactiver le SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
