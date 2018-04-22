import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Token} from "./token.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150})
    name: string;

    @OneToMany(type => Token, token => token.user)
    @JoinColumn()
    tokens: Token[];
}