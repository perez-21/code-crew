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
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard, NeverGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async create(
    @GetUser() user: { user_id: string },
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return await this.applicationsService.create(
      user.user_id,
      createApplicationDto,
    );
  }

  @UseGuards(NeverGuard)
  @Get()
  async findAll() {
    return await this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    // TODO: Make sure only receiver can update this
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
