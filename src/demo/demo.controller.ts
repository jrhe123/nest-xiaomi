import { createWriteStream } from 'fs';
import { join } from 'path';
import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Headers,
  Session,
  Next,
  Request,
  Response,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { DemoService } from './demo.service';

/**
 * route:
 * :id -> Param() -> req.params
 * query -> req.query
 * body -> req.body
 * headers -> req.headers
 * session -> req.session
 * next()
 */
@Controller('demo')
export class DemoController {
  constructor(private demoServices: DemoService) {}

  @Get()
  index() {
    return {
      list: this.demoServices.findAll(),
    };
  }

  @Post()
  create(@Request() req, @Response() res) {
    // 1. cookie usage
    // const signedCookies = req.signedCookies;
    // res.cookie('username', 'roy', {
    //   maxAge: 1000 * 60 * 60,
    //   httpOnly: true,
    // });
    // 2. session usages
    req.session.username = 'abc';
    res.json({
      msg: req.session.username,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() Body, @UploadedFile() file) {
    const filePath = join(__dirname, '../../public/upload/', file.originalname);
    const stream = createWriteStream(filePath);
    stream.write(file.buffer);
    return 'file uploaded';
  }

  @Post('upload_multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'document', maxCount: 1 },
    ]),
  )
  uploadMultipleFiles(@UploadedFiles() files) {
    for (const file of files) {
    }
    return 'files uploaded';
  }
}
