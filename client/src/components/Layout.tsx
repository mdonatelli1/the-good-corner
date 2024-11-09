import Head from "next/head";
import { ReactNode } from "react";

import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
                <title>The Good Corner</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="main-content">{children}</main>
        </>
    );
}
