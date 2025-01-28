import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LogoDto } from './dto/login.dt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    // @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  // Ping для проверки доступности микросервисов
  @Get('ping')
  async pingUsers() {
    return this.authService.send({ cmd: 'ping' }, {});
  }

  // === 🔽 CRUD Users (Связь с `USER_SERVICE`) 🔽 ===

  // Create user
  @Post('users')
  async createUser(@Body() data: CreateUserDto) {
    return this.authService.send({ cmd: 'create_user' }, data);
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    console.log(`Fetching user with ID: ${id}`);
    const user = await this.authService.send({ cmd: 'get_user' }, id).toPromise();
    console.log('User fetched:', user);
    return user;
  }
  

  // Update user
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.authService.send({ cmd: 'update_user' }, { id, update: updateData });
  }

  // Delete user
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.send({ cmd: 'delete_user' }, id);
  }
}
