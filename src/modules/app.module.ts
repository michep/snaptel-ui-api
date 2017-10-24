import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { SnapApiController } from './snapapi/snapapi.controller';
import { ServersController } from './serversapi/serversapi.controller';
import { CorsMiddleware } from '../middleware/cors.middleware';

@Module({
  controllers: [
    SnapApiController,
    ServersController,
  ],
  components: [],
  modules: [],
  exports: [],
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(
      SnapApiController,
      ServersController,
    );
  }
}