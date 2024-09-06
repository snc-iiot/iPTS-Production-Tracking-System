// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   exports: [TypeOrmModule],
//   providers: [],
//   controllers: [],
// })
// export class UsersModule {}
