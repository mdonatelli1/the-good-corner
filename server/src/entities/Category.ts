import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    name: string = "";

    @Field((type) => [Ad])
    @OneToMany(() => Ad, (ad) => ad.category)
    ads?: Ad[];
}
