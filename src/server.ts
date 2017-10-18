import * as bodyParser from 'body-parser';
import * as cluster from 'cluster';
import { cpus } from 'os';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

const numCPUs = cpus().length;

function bootstrap() {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    const app = NestFactory.create(ApplicationModule)
      .then(
        (a) => {
          a.use(bodyParser.json());
          a.listen(3000);
        },
      );
  }
}

bootstrap();
