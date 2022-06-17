import * as path from 'path';
//
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// express app
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  // 2. html template
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  // 3. cookie middleware
  app.use(cookieParser('my super secret password'));
  // 4. session middleware
  app.use(
    session({
      secret: 'another secret here',
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true, maxAge: 1000 * 60 * 30 },
      rolling: true,
    }),
  );

  await app.listen(3030);
}
bootstrap();
