import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(owner: string, createProjectDto: CreateProjectDto) {
    let publishedAt: Date | null = null;
    if (createProjectDto.isPublished) {
      publishedAt = new Date();
    }

    return await this.prismaService.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        owner,
        isPublished: createProjectDto.isPublished,
        publishedAt,
      },
    });
  }

  async findAll(owner: string) {
    return await this.prismaService.project.findMany({ where: { owner } });
  }

  async findOne(owner: string, id: number) {
    return await this.prismaService.project.findUnique({
      where: { owner, id },
    });
  }

  async update(owner: string, id: number, updateProjectDto: UpdateProjectDto) {
    let publishedAt: Date | null = null;
    if (updateProjectDto.isPublished) {
      publishedAt = new Date();
    }
    return await this.prismaService.project.update({
      where: { owner, id },
      data: {
        title: updateProjectDto.title,
        description: updateProjectDto.description,
        isPublished: updateProjectDto.isPublished,
        publishedAt,
      },
    });
  }

  remove(owner: string, id: number) {
    return this.prismaService.project.delete({ where: { owner, id } });
  }
}
