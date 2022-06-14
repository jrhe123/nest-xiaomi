import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private demoServices: DemoService) {}

  @Get()
  index() {
    return {
      list: this.demoServices.findAll(),
    };
  }
}
