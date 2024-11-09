import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    name: string = "";

    @Field((type) => [Ad])
    @ManyToMany(() => Ad, (ad) => ad.tags)
    ads?: Ad[];
}
