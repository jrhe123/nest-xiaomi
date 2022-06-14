import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoService } from './demo/demo.service';
import { DemoController } from './demo/demo.controller';
// middleware
import { InitMiddleware } from './middleware/init.middleware';

@Module({
  imports: [],
  controllers: [AppController, DemoController],
  providers: [AppService, DemoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply to all routes
    consumer.apply(InitMiddleware).forRoutes('*');
  }
}
