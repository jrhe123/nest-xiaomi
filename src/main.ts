import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// express app
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });
  // 2. html viewer
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  // 3. cookie parser
  app.use(cookieParser);

  await app.listen(3030);
}
bootstrap();
