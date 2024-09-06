// src/app.module.ts
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './services/users/users.module';
import { JwtMiddleware } from './common/middlewares';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.0.0.3',
      port: 5432,
      username: 'Backend-CoDE',
      password: '$nc.C0DE@z0z3',
      database: 'iQCS_V1_DEV',
      // database: 'iQCS_V1_PROD',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    CacheModule.register({ isGlobal: true }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('/users/login', '/users/gen-pass', '/users/plants')
      .forRoutes({
        path: '/users*',
        method: RequestMethod.ALL,
      });
  }
}
