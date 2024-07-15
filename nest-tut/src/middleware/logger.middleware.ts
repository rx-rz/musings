import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

//class based middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

//function based middleware
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}