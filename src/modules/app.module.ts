import { Module } from '@nestjs/common';
import { SnapApiController } from './snapapi/snapapi.controller';
import { SeversController } from './servers/servers.controller';

@Module({
    controllers: [
        SnapApiController,
        SeversController,
    ],
    components: [],
    modules: [],
    exports: [],
})
export class ApplicationModule {}