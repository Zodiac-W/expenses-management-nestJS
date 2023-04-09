import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BaseEntityWithTimestamps } from './baseEntityWithTimeStamp.entity';

// @Injectable()
// export class OverrideCreateDate implements NestMiddleware {
//   async use(req: Request, res: Response, next: NextFunction) {
//     if (req.body && req.method === 'POST') {
//       const entity = req.body as BaseEntityWithTimestamps;
//       if ('date' in entity) {
//         const date = entity.date as unknown as string;
//         entity.createdAt = new Date(entity.date);
//         delete entity.date;
//       }
//     }
//     next();
//   }
// }

@Injectable()
export class OverrideCreateDate implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.method === 'POST') {
      console.log('first if');
      const { date, ...entity } = req.body as BaseEntityWithTimestamps & {
        date?: string;
      };
      if (date) {
        console.log('second if');
        console.log(date);
        console.log(entity);
        entity.createdAt = new Date(date);
      } else {
        entity.createdAt = new Date();
      }
      req.body = entity;
      console.log(entity);
    }
    next();
  }
}
