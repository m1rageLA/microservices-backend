import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-api-container', port: 3001 }, // имя контейнера вместо localhost
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'user-api-container', port: 3002 }, // имя контейнера вместо localhost
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
