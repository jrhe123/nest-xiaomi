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
// config mongoose connection
import { MongooseModule } from '@nestjs/mongoose';
// config mysql connection
import { TypeOrmModule } from '@nestjs/typeorm';
// dot.env
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    DemoModule,
    ApiModule,
    DefaultModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'medical',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply middlware to all routes
    consumer.apply(InitMiddleware).forRoutes('*');
  }
}
