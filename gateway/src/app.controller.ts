import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { LogoDto } from './dto/login.dt';

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

  @Post('login')
  async loginUser(@Body() data: LogoDto) {
    console.log('HTTP request to /login received:', data);
    return this.authService.send({ cmd: 'login' }, data);
  }
}
