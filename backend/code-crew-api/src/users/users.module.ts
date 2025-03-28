import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NeverGuard } from 'src/auth/guards';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, NeverGuard],
  controllers: [UsersController],
})
export class UsersModule {}
