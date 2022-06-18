import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/manage')
export class ManageController {
  @Get()
  @Render('admin/manage/index')
  index() {
    return {};
  }

  @Get('add')
  @Render('admin/manage/add')
  add() {
    return {};
  }

  @Get('edit')
  @Render('admin/manage/edit')
  edit() {
    return {};
  }
}
