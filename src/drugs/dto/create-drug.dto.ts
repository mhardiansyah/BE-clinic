import { IsString, IsOptional, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateDrugDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsInt()
  stock: number;

  @IsNumber()
  buy_price: number;

  @IsNumber()
  sell_price: number;

  @IsOptional()
  @IsString()
  dosis?: string;

  @IsOptional()
  @IsString()
  kind?: string;

  @IsBoolean()
  is_halal: boolean;
}