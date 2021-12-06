import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    let now = new Date();
    Logger.debug(now);
    Logger.debug(req.ip);

    next();
  }
}
