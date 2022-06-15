import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * usage: auth verify
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // cookies
    // context.switchToHttp().getRequest().cookies;
    // session
    // context.switchToHttp().getRequest().session;
    console.log('hit guard: ', context);
    return true;
  }
}
