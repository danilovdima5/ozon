import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // <-- Export UsersService so other modules can use it
})
export class UsersModule {}
