import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;
}