import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SingleEmailValidator } from './validation/single-email.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, SingleEmailValidator],
})
export class UserModule {}
