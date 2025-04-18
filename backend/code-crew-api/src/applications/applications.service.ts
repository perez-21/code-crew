import { Injectable, UseGuards } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NeverGuard } from 'src/auth/guards';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(applicant: string, createApplicationDto: CreateApplicationDto) {
    return this.prismaService.application.create({
      data: { ...createApplicationDto, applicant },
    });
  }

  @UseGuards(NeverGuard)
  async findAll() {
    return await this.prismaService.application.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.application.findUnique({ where: { id } });
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return await this.prismaService.application.update({
      where: { id },
      data: updateApplicationDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.application.delete({ where: { id } });
  }
}
