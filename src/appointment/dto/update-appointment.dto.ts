import { IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  symptom_description?: string;
}