import * as bodyParser from 'body-parser';
import * as cluster from 'cluster';
import { cpus } from 'os';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

const numCPUs = cpus().length;
const serverPort = 3000;

function bootstrapCluster() {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    NestFactory.create(ApplicationModule)
      .then(
        (a) => {
          a.use(bodyParser.json());
          a.listen(serverPort);
        },
      );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(bodyParser.json());
  app.listen(serverPort);
}

// bootstrapCluster();
bootstrap();
