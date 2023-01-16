import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelServiceService } from './hotel_service.service';
import { CreateHotelServiceDto } from './dto/create-hotel_service.dto';
import { UpdateHotelServiceDto } from './dto/update-hotel_service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelService } from './entities/hotel_service.entity';

@ApiTags('Hotel Service')
@Controller('hotel-service')
export class HotelServiceController {
  constructor(private readonly hotelServiceService: HotelServiceService) {}

  @ApiOperation({summary: 'Mehmonxona va Servicelarni ulash'})
  @ApiResponse({status: 201, type: HotelService})
  @Post()
  create(@Body() createHotelServiceDto: CreateHotelServiceDto) {
    return this.hotelServiceService.create(createHotelServiceDto);
  }

  @ApiOperation({summary: 'Mehmonxona va Servicelarni royxati'})
  @ApiResponse({status: 201, type: [HotelService]})
  @Get()
  findAll() {
    return this.hotelServiceService.findAll();
  }

  @ApiOperation({summary: 'Mehmonxona va Servicelar bittasi'})
  @ApiResponse({status: 201, type: HotelService})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelServiceService.findOne(+id);
  }

  @ApiOperation({summary: 'Mehmonxona va Servicelarni ozgartirish'})
  @ApiResponse({status: 201, type: HotelService})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelServiceDto: UpdateHotelServiceDto) {
    return this.hotelServiceService.update(+id, updateHotelServiceDto);
  }

  @ApiOperation({summary: 'Mehmonxona va Servicelarni ochirish'})
  @ApiResponse({status: 201, type: HotelService})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelServiceService.remove(+id);
  }
}
