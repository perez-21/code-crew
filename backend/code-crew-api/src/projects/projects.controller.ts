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
import { JwtGuard, NeverGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @GetUser() user: { user_id: string },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectsService.create(user.user_id, createProjectDto);
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @UseGuards(JwtGuard) // I don't get why this is needed
  @Get(':id')
  async findOne(@GetUser() user: { user_id: string }, @Param('id') id: string) {
    // TODO: Anyone should be able to see a published project, only the owner should be able to see a private project
    return await this.projectsService.findOne(user.user_id, +id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/roles') // TODO: Make sure User owns project
  async findAllRoles(@Param('id') id: number) {
    return await this.projectsService.findAllRoles(+id);
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @UseGuards(NeverGuard)
  @Delete(':id')
  async remove(@GetUser() user: { user_id: string }, @Param('id') id: string) {
    return await this.projectsService.remove(user.user_id, +id);
  }
}
