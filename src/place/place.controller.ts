import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Place } from './entities/place.entity';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({summary: 'Xona qoshish'})
  @ApiResponse({status: 201, type: Place})
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @ApiOperation({summary: 'Xonalar royxati'})
  @ApiResponse({status: 201, type: [Place]})
  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @ApiOperation({summary: 'Xona id boyicha bittasi'})
  @ApiResponse({status: 201, type: Place})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(+id);
  }

  @ApiOperation({summary: 'Xona malumotlarini ozgartirish'})
  @ApiResponse({status: 201, type: Place})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(+id, updatePlaceDto);
  }

  @ApiOperation({summary: 'Xona ochirish'})
  @ApiResponse({status: 201, type: Place})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.remove(+id);
  }
}
