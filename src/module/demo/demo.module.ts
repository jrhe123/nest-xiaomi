import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { DemoController } from './controller/demo/demo.controller';
import { DemoService } from './service/demo/demo.service';
// config mongoose schemas
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from 'src/schema/article.schema';
import { ArticleService } from './service/article/article.service';

@Module({
  exports: [DemoService], // export for other modules
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Article',
        schema: ArticleSchema,
        collection: 'article',
      },
    ]),
  ],
  controllers: [DemoController],
  providers: [DemoService, AppService, ArticleService],
})
export class DemoModule {}
