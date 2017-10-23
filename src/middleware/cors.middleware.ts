import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Middleware()
export class CorsMiddleware implements NestMiddleware {

  private CORS: string = '*';

  resolve(...args: any[]): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', this.CORS);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      next();
    };
  }
}
