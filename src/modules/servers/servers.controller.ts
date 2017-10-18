import { Controller, Param, Get, Put, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { initSync, getItemSync, setItemSync } from 'node-persist';
import { SnapServer } from '../../shared/snap';

@Controller('servers')

export class SeversController {

    private servers: any;

  constructor() {
    initSync();
    this.servers = getItemSync('snaptel_servers');
  }

  @Get('')
  getServerList(@Res() res: Response) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json(this.servers);
  }

  @Get(':id')
  getServer(@Res() res: Response, @Param('id') id: string) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.json(this.servers[id]);
  }

  @Post('')
  updateServer(@Body() server: SnapServer, @Req() req: Request, @Res() res: Response) {
      this.servers[server.key] = server;
      setItemSync('snaptel_servers', this.servers);
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.send('');
  }
}
