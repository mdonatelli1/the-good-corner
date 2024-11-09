import { Arg, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { dataSource } from "../config/db";

@Resolver(Ad)
export class AdQueries {
    @Query(() => [Ad])
    async getAllAds(): Promise<Ad[]> {
        return await dataSource.manager.find(Ad, {
            relations: ["category", "tags"],
        });
    }

    @Query(() => Ad, { nullable: true })
    async getAd(@Arg("id") id: number): Promise<Ad | null> {
        return await dataSource.manager.findOne(Ad, {
            where: { id },
            relations: ["category", "tags"],
        });
    }
}
