import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Query, Resolver } from "type-graphql";

import { dataSource } from "../config/db";
import { User } from "../entities/User";
import { UserInput } from "./UserMutations";

@Resolver(User)
export class UserQueries {
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return await dataSource.manager.find(User);
    }

    @Query(() => User, { nullable: true })
    async getUser(@Arg("id") id: number): Promise<User | null> {
        return await dataSource.manager.findOne(User, {
            where: { id },
        });
    }

    @Query(() => String, { nullable: true })
    async login(@Arg("userData") userData: UserInput): Promise<string> {
        let { email, password } = userData;

        const user = await dataSource.manager.findOne(User, {
            where: { email },
        });
        if (!user) {
            throw new Error("No user found");
        }

        // argon2
        const isValid: boolean = await argon2.verify(
            user.passwordHashed,
            password
        );
        if (!isValid) {
            throw new Error("Password is incorrect");
        }

        // jwt
        const jwtSecret: string = "COUCOUTOUTLEMONDE";
        const token: string = jwt.sign({ email, role: user.role }, jwtSecret);
        if (!jwtSecret) {
            throw new Error("Invalid JWT secret");
        }

        return token;
    }
}
