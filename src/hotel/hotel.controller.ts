import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hotel } from './entities/hotel.entity';
import { Request, Response } from 'express';

@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @ApiOperation({summary: 'Mehmonxona qoshish'})
  @ApiResponse({status: 201, type: Hotel})
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @ApiOperation({summary: 'Mehmonxonalar royxati'})
  @ApiResponse({status: 201, type: [Hotel]})
  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @ApiOperation({summary: 'Mehmonxonani id boyicha olish'})
  @ApiResponse({status: 201, type: Hotel})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @ApiOperation({summary: 'Mehmonxona malumotlarini ozgartirish'})
  @ApiResponse({status: 201, type: Hotel})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto, @Req() req: Request) {
    return this.hotelService.update(+id, updateHotelDto, req);
  }

  @ApiOperation({summary: 'Mehmonxonani ochirish'})
  @ApiResponse({status: 201, type: Hotel})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
