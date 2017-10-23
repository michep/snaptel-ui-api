import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { SnapApiController } from './snapapi/snapapi.controller';
import { SeversController } from './servers/servers.controller';
import { CorsMiddleware } from '../middleware/cors.middleware';

@Module({
  controllers: [
    SnapApiController,
    SeversController,
  ],
  components: [],
  modules: [],
  exports: [],
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(
      SnapApiController,
      SeversController,
    );
  }
}