import { PartialType } from '@nestjs/swagger';
import { CreateFacilitiesPlaceDto } from './create-facilities_place.dto';

export class UpdateFacilitiesPlaceDto extends PartialType(CreateFacilitiesPlaceDto) {}
