import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @MessagePattern({ cmd: 'ping' })
  handlePing() {
    console.log('Ping message received'); // Лог для отладки
    return { message: 'Auth Service is responding via Microservice!' };
  }
}
