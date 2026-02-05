// backend/src/appointment/dto/create-appointment.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  user_id!: string; // Tambahkan ini untuk bypass token

  @IsNotEmpty()
  @IsString()
  clinic_id!: string;

  @IsNotEmpty()
  @IsString()
  poly_id!: string;

  @IsNotEmpty()
  @IsString()
  doctor_id!: string;

  @IsNotEmpty()
  @IsString()
  date_id!: string;

  @IsNotEmpty()
  @IsString()
  time_id!: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  symptom_description?: string;
}