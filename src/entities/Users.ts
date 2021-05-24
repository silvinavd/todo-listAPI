import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany,
    BaseEntity, JoinTable
} from 'typeorm';
import { Todo } from "./Todo";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, todo => todo.users,{
        onDelete: 'CASCADE',
    })
    todo: Todo[];
}