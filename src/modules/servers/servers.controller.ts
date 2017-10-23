import { Controller, Param, Get, Put, Delete, Options, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { initSync, getItemSync, setItemSync } from 'node-persist';
import { SnapServer } from '../../shared/snap';

@Controller('serversapi')
export class SeversController {

    private servers: any;
    private CORS: string = '*';

  constructor() {
    initSync();
    this.servers = getItemSync('snaptel_servers');
  }

  @Get('')
  getServerList(@Res() res: Response) {
    res.json(this.servers);
  }

  @Get(':id')
  getServer(@Res() res: Response, @Param('id') id: string) {
      res.json(this.servers[id]);
  }

  @Post('')
  createServer(@Body() server: SnapServer, @Res() res: Response) {
      this.servers[server.key] = server;
      setItemSync('snaptel_servers', this.servers);
      res.send('');
  }

  @Put(':id')
  updateServer(@Body() server: SnapServer, @Res() res: Response, @Param('id') id: string) {
      this.servers[id] = server;
      setItemSync('snaptel_servers', this.servers);
      res.send('');
  }

  @Delete(':id')
  removeServer(@Res() res: Response, @Param('id') id: string) {
      delete(this.servers[id]);
      setItemSync('snaptel_servers', this.servers);
      res.send('');
  }

  @Options('')
  options(@Body() body, @Res() res) {
    res.send(body);
  }

  @Options(':id')
  optionsID(@Body() body, @Res() res) {
    res.send(body);
  }

}
