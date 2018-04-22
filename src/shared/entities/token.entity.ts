import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.tokens, {
        eager: true,
    })
    user: User;

    @Column({length: 150})
    token: string;
}