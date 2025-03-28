import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsBoolean()
  @IsDefined()
  isAssigned?: boolean;

  @IsString()
  @IsNotEmpty()
  assignee: string;

  @IsNumber()
  @Min(1)
  projectId: number;
}
