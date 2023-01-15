import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelServiceService } from './hotel_service.service';
import { CreateHotelServiceDto } from './dto/create-hotel_service.dto';
import { UpdateHotelServiceDto } from './dto/update-hotel_service.dto';

@Controller('hotel-service')
export class HotelServiceController {
  constructor(private readonly hotelServiceService: HotelServiceService) {}

  @Post()
  create(@Body() createHotelServiceDto: CreateHotelServiceDto) {
    return this.hotelServiceService.create(createHotelServiceDto);
  }

  @Get()
  findAll() {
    return this.hotelServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelServiceDto: UpdateHotelServiceDto) {
    return this.hotelServiceService.update(+id, updateHotelServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelServiceService.remove(+id);
  }
}
