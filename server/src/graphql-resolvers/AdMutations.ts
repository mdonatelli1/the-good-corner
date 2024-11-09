import {
    Resolver,
    Mutation,
    Arg,
    InputType,
    Field,
    Authorized,
} from "type-graphql";

import { dataSource } from "../config/db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";

@InputType()
class AdInput {
    @Field()
    title: string = "";

    @Field()
    price: number = 0;

    @Field()
    category: string = "";
}

@Resolver(Ad)
export class AdMutations {
    @Authorized("ADMIN", "USER")
    @Mutation(() => Ad)
    async publishAd(@Arg("adData") adData: AdInput): Promise<Ad> {
        let { title, price, category: categoryName }: AdInput = adData;
        let category: Category | null = await dataSource.manager.findOneBy(
            Category,
            {
                name: categoryName,
            }
        );
        if (!category) {
            category = dataSource.manager.create(Category, {
                name: categoryName,
            });
            await dataSource.manager.save(category);
        }
        const ad: Ad = dataSource.manager.create(Ad, {
            title,
            price,
            category: category,
        });
        await dataSource.manager.save(ad);
        return ad;
    }
}
