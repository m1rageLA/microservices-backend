import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Указываем pattern
  @MessagePattern({ cmd: 'ping' })
  handlePing() {
    console.log('Ping message received');
    return this.appService.handlePing();
  }

  @MessagePattern({ cmd: 'login' })
  async loginUser(data: { username: string; password: string }) {
    console.log('Login message received');
    return this.appService.loginUser(data);
  }
}
