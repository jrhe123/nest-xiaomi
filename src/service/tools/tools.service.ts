import { Injectable } from '@nestjs/common';

import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }
}
