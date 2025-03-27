import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NeverGuard } from 'src/auth/guards';

@Module({
  providers: [UsersService, PrismaService, NeverGuard],
  controllers: [UsersController],
})
export class UsersModule {}
