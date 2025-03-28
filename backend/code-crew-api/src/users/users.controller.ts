import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard, NeverGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { CreateUserDto, UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(NeverGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  getMe(@GetUser() user: { user_id: string }) {
    return this.userService.getMe(user.user_id);
  }

  @Get('me/projects')
  async findAllProjects(@GetUser() user: { user_id: string }) {
    return await this.userService.findAllProjects(user.user_id);
  }

  @Get('me/roles')
  async findAllRoles(@GetUser() user: { user_id: string }) {
    return await this.userService.findAllRoles(user.user_id);
  }

  @Get('me/applications')
  async findAllApplications(@GetUser() user: { user_id: string }) {
    return await this.userService.findAllApplications(user.user_id);
  }

  @Patch('me')
  update(
    @GetUser() user: { user_id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.user_id, updateUserDto);
  }

  @UseGuards(NeverGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(NeverGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
