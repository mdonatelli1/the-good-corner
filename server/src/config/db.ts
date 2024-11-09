import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "bonjour",
    database: "the_good_corner",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
});

const _handleCategory = async (categoryName: string): Promise<Category> => {
    let category = await dataSource.manager.findOneBy(Category, {
        name: categoryName,
    });
    if (!category) {
        category = new Category();
        category.name = categoryName;
        await dataSource.manager.save(category);
    }
    return category;
};

const _handleTags = async (tagNames: string[]): Promise<Tag[]> => {
    const tags: Tag[] = [];
    for (let tagName of tagNames) {
        let tag = await dataSource.manager.findOneBy(Tag, { name: tagName });
        if (!tag) {
            tag = new Tag();
            tag.name = tagName;
            await dataSource.manager.save(tag);
        }
        tags.push(tag);
    }
    return tags;
};

export async function cleanDB() {
    await dataSource.query("TRUNCATE TABLE ad RESTART IDENTITY CASCADE;");
    await dataSource.query("TRUNCATE TABLE tag RESTART IDENTITY CASCADE;");
    await dataSource.query("TRUNCATE TABLE category RESTART IDENTITY CASCADE;");
}

export async function initData() {
    const ads = [
        {
            title: "Table",
            picture: "/images/table.webp",
            price: 120,
            category: "Meuble",
            tags: ["Bois", "Maison"],
        },
        {
            title: "Dame-jeanne",
            picture: "/images/dame-jeanne.webp",
            price: 75,
            category: "Vintage",
            tags: ["Verre", "Maison", "Ancien"],
        },
        {
            title: "Vide-poche",
            picture: "/images/vide-poche.webp",
            price: 4,
            category: "Décoration",
            tags: ["Maison"],
        },
        {
            title: "Vaisselier",
            picture: "/images/vaisselier.webp",
            price: 900,
            category: "Meuble",
            tags: ["Maison"],
        },
        {
            title: "Bougie",
            picture: "/images/bougie.webp",
            price: 8,
            category: "Décoration",
            tags: ["Maison", "Art & Déco", "Cadeau"],
        },
        {
            title: "Porte-magazine",
            picture: "/images/porte-magazine.webp",
            price: 45,
            category: "Décoration",
            tags: ["Maison"],
        },
    ];

    const adsToSave = await Promise.all(
        ads.map(async (ad) => {
            const newAd = new Ad();
            newAd.title = ad.title;
            newAd.picture = ad.picture;
            newAd.price = ad.price;
            newAd.category = await _handleCategory(ad.category);
            newAd.tags = await _handleTags(ad.tags);
            return newAd;
        })
    );

    await dataSource.manager.save(Ad, adsToSave);
}
