import { Module } from '@nestjs/common';
import { DemoController } from './controller/demo/demo.controller';
import { DemoService } from './service/demo/demo.service';
// config mongoose schemas
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from 'src/model/mongo/schema/article.schema';
import { ArticleService } from './service/article/article.service';
// typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/model/mysql/entity/article.entity';

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
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [DemoController],
  providers: [DemoService, ArticleService],
})
export class DemoModule {}
