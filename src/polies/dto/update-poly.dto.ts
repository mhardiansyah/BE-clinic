import { PartialType } from '@nestjs/mapped-types';
import { CreatePolyDto } from './create-poly.dto';

export class UpdatePolyDto extends PartialType(CreatePolyDto) {}
