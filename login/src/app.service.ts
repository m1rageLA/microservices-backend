import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'ping' })
  handlePing() {
    console.log('Ping message received'); // Лог для отладки
    return { message: 'pong' };
  }
}
