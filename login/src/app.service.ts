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

  @MessagePattern({ cmd: 'login' })
  async loginUser(data: { username: string; password: string }) {
    try {
      const user = await this.authService.signIn(data.username, data.password);
      console.log('Login successful for user:', data.username);
      return { status: 'success', user };
    } catch (error) {
      console.error('Login failed:', error.message);
      return { status: 'error', message: error.message };
    }
  }
}
