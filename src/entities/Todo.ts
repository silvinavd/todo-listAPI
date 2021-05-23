import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  done: boolean;
  
}