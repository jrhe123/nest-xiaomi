import { Module } from '@nestjs/common';
import { DemoController } from './controller/demo/demo.controller';
import { DemoService } from './service/demo/demo.service';

@Module({
  imports: [],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
