import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstName: true,
        lastName: true,
        email: true,
        hash: false,
        projects: true,
        roles: true,
        Application: true, // TODO: make lowercase in next migration
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      select: { id: true, firstName: true, lastName: true },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          firstName: createUserDto.firstname,
          lastName: createUserDto.lastname,
          email: createUserDto.email,
          hash: createUserDto.password,
        },
        select: {
          hash: false,
          firstName: true,
          lastName: true,
          email: true,
          id: true,
          updatedAt: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email address taken');
        }

        throw error;
      }
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }
    try {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: updateUserDto,
        select: {
          hash: false,
          firstName: true,
          lastName: true,
          email: true,
          id: true,
          updatedAt: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email address taken');
        }
        if (error.code === 'P2001') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2001')
          throw new NotFoundException('User does not exist');
      }
      throw error;
    }
  }

  async getMe(id: string) {
    return await this.findOne(id);
  }

  async findAllProjects(owner: string) {
    return await this.prismaService.project.findMany({ where: { owner } });
  }

  async findAllRoles(owner: string) {
    return await this.prismaService.role.findMany({
      where: { assignee: owner },
    });
  }

  async findAllApplications(owner: string) {
    return await this.prismaService.application.findMany({
      where: { applicant: owner },
    });
  }
}
