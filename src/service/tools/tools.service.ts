import { Injectable } from '@nestjs/common';

import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }

  // import { Connection } from "typeorm";
  // constructor(
  //   @InjectRepository(Book)
  //       private bookRepository: Repository<Book>,
  //       private connection: Connection
  //   ){}
  //   async createMultipleBooks(books: Book[]) {
  //     const queryRunner = this.connection.createQueryRunner();
  //          await queryRunner.connect();
  //          await queryRunner.startTransaction();
  //          try {
  //              await queryRunner.manager.save(books[0]);
  //              await queryRunner.manager.save(books[1]);

  //              await queryRunner.commitTransaction();
  //          }catch (err) {
  //              await queryRunner.rollbackTransaction();
  //          }finally {
  //              await queryRunner.release();
  //          }
  //  }
}
