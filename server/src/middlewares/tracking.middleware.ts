import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    let now = new Date();
    console.log(now);
    console.log(req.ip);

    next();
  }
}
