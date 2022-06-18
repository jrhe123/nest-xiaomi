import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('admin/login')
export class LoginController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const captcha = this.toolsService.captcha();
    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
