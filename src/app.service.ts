import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppConfig() {
    return {
      domain: 'www.google.ca',
    };
  }
}
