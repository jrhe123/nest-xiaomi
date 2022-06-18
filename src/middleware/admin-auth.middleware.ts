import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const path = req.baseUrl;
    if (
      path === '/admin/login' ||
      path === '/admin/login/code' ||
      path === '/admin/dologin'
    ) {
      next();
      return;
    }
    const userInfo = req.session.userInfo;
    if (!userInfo && userInfo.username) {
      return res.redirect('/admin/login');
    }
    next();
  }
}
