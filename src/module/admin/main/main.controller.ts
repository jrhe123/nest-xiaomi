import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class MainController {
  @Get()
  index() {
    return 'admin index page';
  }
}
