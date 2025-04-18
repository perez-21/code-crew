import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsDefined()
  isAssigned: boolean; // TODO: update schema to make assignee optional

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsNumber()
  @Min(1)
  projectId: number;
}
