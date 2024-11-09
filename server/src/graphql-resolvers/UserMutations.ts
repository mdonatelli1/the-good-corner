import * as argon2 from "argon2";
import { Resolver, Mutation, Arg, InputType, Field } from "type-graphql";

import { dataSource } from "../config/db";
import { User } from "../entities/User";

@InputType()
export class UserInput {
    @Field()
    email: string = "";

    @Field()
    role?: string = "USER";

    @Field()
    password: string = "";
}

@Resolver(User)
export class UserMutations {
    @Mutation(() => User)
    async register(@Arg("userData") userData: UserInput): Promise<User> {
        let { email, role, password } = userData;

        // argon2
        const passwordHashed: string = await argon2.hash(password);

        const user = dataSource.manager.create(User, {
            email,
            role,
            passwordHashed,
        });
        await dataSource.manager.save(user);

        return user;
    }
}
