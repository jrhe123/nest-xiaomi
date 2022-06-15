import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { DemoController } from './controller/demo/demo.controller';
import { DemoService } from './service/demo/demo.service';

@Module({
  exports: [DemoService], // export for other modules
  imports: [],
  controllers: [DemoController],
  providers: [DemoService, AppService],
})
export class DemoModule {}
