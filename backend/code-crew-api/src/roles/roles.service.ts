import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(owner: string, createRoleDto: CreateRoleDto) {
    let assignee: string;
    if (createRoleDto.isAssigned) {
      assignee = createRoleDto.assignee;
    } else {
      assignee = owner;
    }

    createRoleDto.assignee = assignee;

    return await this.prismaService.role.create({ data: createRoleDto });
  }

  async findAll() {
    return await this.prismaService.role.findMany();
  }

  async findAllApplications(roleId: number) {
    return await this.prismaService.application.findMany({ where: { roleId } });
  }

  async findOne(id: number) {
    return await this.prismaService.role.findUnique({ where: { id } });
  }

  async update(owner: string, id: number, updateRoleDto: UpdateRoleDto) {
    // only role creator should be able to update a role
    let assignee: string;
    if (updateRoleDto.isAssigned) {
      assignee = updateRoleDto.assignee;
    } else {
      assignee = owner;
    }

    updateRoleDto.assignee = assignee;

    return await this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.role.delete({ where: { id } });
  }
}
