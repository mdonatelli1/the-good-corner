import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    email: string = "";

    @Field()
    @Column()
    role: string = "USER";

    @Field()
    @Column()
    passwordHashed: string = "";
}
