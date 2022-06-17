import { Module } from '@nestjs/common';
// controllers
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManageController } from './manage/manage.controller';
// services
import { ToolsService } from 'src/service/tools/tools.service';

@Module({
  controllers: [MainController, LoginController, ManageController],
  providers: [ToolsService],
})
export class AdminModule {}
