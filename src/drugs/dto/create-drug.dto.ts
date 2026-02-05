import { IsString, IsOptional, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateDrugDto {
  @IsString()
  name!: string; // Tambahkan ! di sini

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsInt()
  stock!: number; // Tambahkan ! di sini

  @IsNumber()
  buy_price!: number; // Tambahkan ! di sini

  @IsNumber()
  sell_price!: number; // Tambahkan ! di sini

  @IsOptional()
  @IsString()
  dosis?: string;

  @IsOptional()
  @IsString()
  kind?: string;

  @IsBoolean()
  is_halal!: boolean; // Tambahkan ! di sini
}