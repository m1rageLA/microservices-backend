import { Controller, Get, Inject } from '@nestjs/common';
// import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    // @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Get('ping')
  async pingUsers() {
    return this.authService.send({ cmd: 'ping' }, {});
  }
}
