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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @GetUser() user: { user_id: string },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectsService.create(user.user_id, createProjectDto);
  }

  @Get()
  async findAll(@GetUser() user: { user_id: string }) {
    return await this.projectsService.findAll(user.user_id);
  }

  @Get(':id')
  async findOne(@GetUser() user: { user_id: string }, @Param('id') id: string) {
    return await this.projectsService.findOne(user.user_id, +id);
  }

  @Patch(':id')
  async update(
    @GetUser() user: { user_id: string },
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(
      user.user_id,
      +id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  async remove(@GetUser() user: { user_id: string }, @Param('id') id: string) {
    return await this.projectsService.remove(user.user_id, +id);
  }
}
