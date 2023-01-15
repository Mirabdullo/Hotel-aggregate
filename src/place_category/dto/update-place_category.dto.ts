import { PartialType } from '@nestjs/swagger';
import { CreatePlaceCategoryDto } from './create-place_category.dto';

export class UpdatePlaceCategoryDto extends PartialType(CreatePlaceCategoryDto) {}
