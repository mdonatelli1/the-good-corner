import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";

import { cleanDB, dataSource, initData } from "./config/db";
import { AdQueries } from "./graphql-resolvers/AdQueries";
import { CategoryQueries } from "./graphql-resolvers/CategoryQueries";
import { AdMutations } from "./graphql-resolvers/AdMutations";
import { UserQueries } from "./graphql-resolvers/UserQueries";
import { UserMutations } from "./graphql-resolvers/UserMutations";

async function launchApolloServer() {
    const schema = await buildSchema({
        resolvers: [
            AdQueries,
            CategoryQueries,
            AdMutations,
            UserQueries,
            UserMutations,
        ],
        authChecker: ({ context }, roles: string[]) => {
            if (
                context.user &&
                (roles.length == 0 || roles.includes(context.user.role))
            ) {
                return true;
            }

            return false;
        },
    });

    const server = new ApolloServer({
        schema,
    });

    await dataSource.initialize();

    await cleanDB();
    await initData();

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const authHeader: string | undefined = req.headers.authorization;
            let user = null;

            if (authHeader?.startsWith("Bearer ") === true) {
                const tokenValue: string = authHeader.substring(
                    "Bearer ".length
                );

                // jwt
                const jwtSecret: string = "COUCOUTOUTLEMONDE";
                if (!jwtSecret) {
                    throw new Error("Invalid JWT secret");
                }
                user = jwt.verify(tokenValue, jwtSecret);
            }

            return { user };
        },
    });

    console.log(`Le serveur a démarré à l'url : ${url}`);
}
launchApolloServer();
