import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  clinic_id: string;

  @IsUUID()
  poly_id: string;

  @IsUUID()
  doctor_id: string;

  @IsUUID()
  date_id: string;

  @IsUUID()
  time_id: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  symptom_description?: string;
}