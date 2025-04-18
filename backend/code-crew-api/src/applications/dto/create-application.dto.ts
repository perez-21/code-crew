import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNumber()
  @Min(1)
  roleId: number;
}

export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}
