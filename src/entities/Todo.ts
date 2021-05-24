import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
    BaseEntity, JoinTable
} from 'typeorm';

import { Users } from "./Users";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    done: boolean;

    @ManyToOne(() => Users, users => users.todo)
    users: Users;



}