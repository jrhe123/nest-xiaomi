import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManageController } from './manage/manage.controller';

@Module({
  controllers: [MainController, LoginController, ManageController],
})
export class AdminModule {}
