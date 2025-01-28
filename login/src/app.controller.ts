import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  // CREATE
  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() data: Partial<UserEntity>) {
    return this.userService.createUser(data.username, data.password);
  }

  // READ (получить пользователя по ID)
  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() username: string) {
    return this.userService.findUserByName(username);
  }

  // UPDATE
  @MessagePattern({ cmd: 'update_user' })
  async handleUpdateUser(data: { id: string; update: Partial<UserEntity> }) {
    const { id, update } = data;
    const result = await this.userService.updateUserById(id, update);
  
    if ('message' in result) {
      return { status: 'error', message: result.message }; // Если пользователь не найден
    }
  
    return { status: 'success', user: result }; // Если обновление успешно
  }

  // DELETE
  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() id: string) {
    return this.userService.deleteUserById(id);
  }
}
