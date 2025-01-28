import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //---POST---
  async createUser(username?: string, password?: string): Promise<UserEntity> {
    const user = this.userRepository.create({ username, password });
    return this.userRepository.save(user);
  }

  //---GET---
  async findUserByName(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new Error(`User with username "${username}" not found.`);
    }

    return user;
  }

  //---PUT---
  async updateUserById(id: string, update: Partial<UserEntity>) {
    const objectId = new ObjectId(id);

    // Ищем по _id
    const user = await this.userRepository.findOneBy({ _id: objectId });
    if (!user) {
      return { message: `User with ID "${id}" not found.` };
    }

    Object.assign(user, update);
    return this.userRepository.save(user);
  }

  async deleteUserById(id: string): Promise<{ status: string }> {
    const objectId = new ObjectId(id);
    const result = await this.userRepository.delete({ _id: objectId });

    if (result.affected === 0) {
      throw new Error('User not found');
    }

    return { status: 'deleted' };
  }
}
