import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = (mm + '/' + dd + '/' + yyyy) as any;
    Logger.debug(today);
    Logger.debug(req.headers);

    next();
  }
}
