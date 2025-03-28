import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtGuard, NeverGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JwtGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @GetUser() user: { user_id: string },
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return await this.rolesService.create(user.user_id, createRoleDto);
  }

  @UseGuards(NeverGuard)
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Get(':id/applications') // TODO: Make sure user can access the role
  async findAllApplications(@Param('id') id: string) {
    return await this.rolesService.findAllApplications(+id);
  }

  @Patch(':id')
  async update(
    @GetUser() user: { user_id: string },
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.rolesService.update(user.user_id, +id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(+id);
  }
}
