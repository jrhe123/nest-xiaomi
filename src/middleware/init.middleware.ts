import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * cli: nest g middleware middleware/init
 */
@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log('this is dummy middleware');
    next();
  }
}
