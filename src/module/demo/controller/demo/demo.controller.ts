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
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
//
import * as Joi from 'joi';
import { DemoService } from '../../service/demo/demo.service';
import { DemoPipe } from '../../pipe/demo/demo.pipe';
import { AuthGuard } from 'src/guard/auth.guard';
import { ArticleService } from '../../service/article/article.service';

const demoSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

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
@UseGuards(AuthGuard)
export class DemoController {
  constructor(
    private demoService: DemoService,
    private articleService: ArticleService,
  ) {}

  @Get()
  index() {
    return {
      list: this.demoService.findAll(),
    };
  }

  @Get('test')
  @UsePipes(new DemoPipe(demoSchema))
  test(@Query() query) {
    return {
      query,
    };
  }

  @Get('articles')
  async getArticles() {
    const articles = await this.articleService.findAll(
      {
        title: 'roytest',
      },
      'title',
    );
    return articles;
  }

  @Get('articles_mysql')
  async getMysqlArticles() {
    const articles = await this.articleService.findAllMysql({
      where: {
        title: 'roytest',
      },
      order: {
        id: 'DESC',
      },
    });
    return articles;
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
