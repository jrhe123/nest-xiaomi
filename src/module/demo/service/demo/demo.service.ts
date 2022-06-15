import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  findAll() {
    return [{ title: '123' }, { title: '234' }, { title: '345' }];
  }
}
