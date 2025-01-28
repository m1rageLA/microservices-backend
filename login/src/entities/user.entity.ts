import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class UserEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    username: string;

    @Column()
    password: string;
}