import { Controller, Get } from '@nestjs/common';

@Controller('admin/manage')
export class ManageController {
  @Get()
  index() {
    return 'admin manage page';
  }
}
