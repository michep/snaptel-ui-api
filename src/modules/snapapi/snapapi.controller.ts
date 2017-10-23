import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Controller, Param, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

import * as storage from 'node-persist';

@Controller('snapapi')
export class SnapApiController {

  constructor() {
  }

  @Get('tasks/:server')
  getTasksList(@Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/tasks')
      .timeout(100)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).json(JSON.parse(data.response.body));
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('tasks/:server/:id')
  getTask(@Res() res: Response, @Param('server') server: string, @Param('id') id: string) {
    RxHR.get(server + '/v2/tasks/' + id)
      .timeout(200)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).json(JSON.parse(data.response.body));
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('metrics/:server')
  getMetricsList(@Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/metrics')
      .timeout(200)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).json(JSON.parse(data.response.body));
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('plugins/:server')
  getPluginsList(@Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/plugins')
      .timeout(200)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).json(JSON.parse(data.response.body));
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  private isRxHttpRequestResponse(arg: any): arg is RxHttpRequestResponse {
    return arg.response !== undefined && arg.body !== undefined;
  }
}
