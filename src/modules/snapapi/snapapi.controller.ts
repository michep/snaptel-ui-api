import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Controller, Param, Get, Put, Options, Res, Req, Query, Body } from '@nestjs/common';
import { Response, Request } from 'express';

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
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).send(data.response.body);
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('tasks/:server/:id')
  getTask(@Res() res: Response, @Param('server') server: string, @Param('id') id: string) {
    RxHR.get(server + '/v2/tasks/' + id)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).send(data.response.body);
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Put('tasks/:server/:id')
  taskAcion(@Req() request: Request, @Res() res: Response, @Param('server') server: string, @Param('id') id: string) {
    const query = request.url.split('?').slice(1).join('?');
    RxHR.put(server + '/v2/tasks/' + id + '?' + query)
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).send(data.response.body);
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('metrics/:server')
  getMetricsList(@Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/metrics')
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).send(data.response.body);
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  @Get('plugins/:server')
  getPluginsList(@Res() res: Response, @Param('server') server: string) {
    RxHR.get(server + '/v2/plugins')
      .catch(
        (err, data) => {
          return Observable.of({});
        },
      )
      .subscribe(
        (data) => {
          if (this.isRxHttpRequestResponse(data)) {
            res.status(data.response.statusCode).send(data.response.body);
          } else {
            res.sendStatus(500);
          }
        },
      );
  }

  private isRxHttpRequestResponse(arg: any): arg is RxHttpRequestResponse {
    return arg.response !== undefined && arg.body !== undefined;
  }

  @Options('*')
  options(@Body() body, @Res() res) {
    res.send(body);
  }

}
