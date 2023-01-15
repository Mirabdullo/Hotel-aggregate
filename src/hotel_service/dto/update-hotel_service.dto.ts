import { PartialType } from '@nestjs/swagger';
import { CreateHotelServiceDto } from './create-hotel_service.dto';

export class UpdateHotelServiceDto extends PartialType(CreateHotelServiceDto) {}
