import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// middleware
import { InitMiddleware } from './middleware/init.middleware';
// sub-modules
import { DemoModule } from './module/demo/demo.module';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';

@Module({
  imports: [AdminModule, DemoModule, ApiModule, DefaultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply middlware to all routes
    consumer.apply(InitMiddleware).forRoutes('*');
  }
}
