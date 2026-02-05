import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  clinic_id?: string;

  @IsNotEmpty()
  @IsUUID()
  poly_id?: string;

  @IsNotEmpty()
  @IsUUID()
  doctor_id?: string;

  @IsNotEmpty()
  @IsUUID()
  date_id?: string;

  @IsNotEmpty()
  @IsUUID()
  time_id?: string;

  // Optional: Karena di langkah pertama, gejala mungkin belum diisi
  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  symptom_description?: string;
}