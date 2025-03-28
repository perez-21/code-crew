import { PartialType } from '@nestjs/mapped-types';
import {
  ApplicationStatus,
  CreateApplicationDto,
} from './create-application.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsNotEmpty()
  @IsString()
  status: ApplicationStatus;
}
