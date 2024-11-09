import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    title: string = "";

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string = "";

    @Field({ nullable: true })
    @Column({ nullable: true })
    owner?: string = "";

    @Field((type) => Int)
    @Column()
    price: number = 0;

    @Field((type) => Date)
    @Column()
    createdAt: Date = new Date();

    @Field({ nullable: true })
    @Column({ nullable: true })
    picture?: string = "";

    @Field({ nullable: true })
    @Column({ nullable: true })
    location?: string = "";

    @Field((type) => Category)
    @ManyToOne(() => Category, (category) => category.ads)
    category?: Category;

    @Field((type) => [Tag])
    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];
}
