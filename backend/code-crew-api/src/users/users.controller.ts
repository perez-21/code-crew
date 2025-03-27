import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard, NeverGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: { user_id: string }) {
    return this.userService.getMe(user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
