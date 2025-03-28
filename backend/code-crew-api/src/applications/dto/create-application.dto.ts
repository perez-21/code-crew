import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  applicant: string;

  @IsNumber()
  @Min(1)
  projectId: number;

  @IsNumber()
  @Min(1)
  roleId: number;
}

export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}
