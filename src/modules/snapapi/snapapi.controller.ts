import { RxHR } from '@akanass/rx-http-request';
import { Controller, Param, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import * as storage from 'node-persist';

@Controller('snapapi')
export class SnapApiController {

  constructor() {
  }

  @Get('tasks/:server')
  getTasks(@Req() req: Request, @Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/tasks')
    .subscribe(
      (data) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.status(data.response.statusCode).json(JSON.parse(data.response.body));
      },
      (error) => {
        console.error(error);
      },
    );
  }

  @Get('tasks/:server/:id')
  getTask(@Req() req: Request, @Res() res: Response, @Param('server') server: string, @Param('id') id: string) {
    RxHR.get(server + '/v2/tasks/' + id)
    .subscribe(
      (data) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.status(data.response.statusCode).json(JSON.parse(data.response.body));
      },
      (err) => {
        console.error(err);
      },
      () => {
        console.log('DONE');
      },
    );
  }

}
