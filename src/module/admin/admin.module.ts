import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';

@Module({
  controllers: [LoginController, MainController, ManagerController],
})
export class AdminModule {}
