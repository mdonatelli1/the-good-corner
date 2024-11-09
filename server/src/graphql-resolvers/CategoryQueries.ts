import { Query, Resolver } from "type-graphql";
import { dataSource } from "../config/db";
import { Category } from "../entities/Category";

@Resolver(Category)
export class CategoryQueries {
    @Query(() => [Category])
    async getAllCategories(): Promise<Category[]> {
        return await dataSource.manager.find(Category, {
            relations: ["ads"],
        });
    }
}
