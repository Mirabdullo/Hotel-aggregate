import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilitiesPlaceService } from './facilities_place.service';
import { CreateFacilitiesPlaceDto } from './dto/create-facilities_place.dto';
import { UpdateFacilitiesPlaceDto } from './dto/update-facilities_place.dto';

@Controller('facilities-place')
export class FacilitiesPlaceController {
  constructor(private readonly facilitiesPlaceService: FacilitiesPlaceService) {}

  @Post()
  create(@Body() createFacilitiesPlaceDto: CreateFacilitiesPlaceDto) {
    return this.facilitiesPlaceService.create(createFacilitiesPlaceDto);
  }

  @Get()
  findAll() {
    return this.facilitiesPlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesPlaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacilitiesPlaceDto: UpdateFacilitiesPlaceDto) {
    return this.facilitiesPlaceService.update(+id, updateFacilitiesPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesPlaceService.remove(+id);
  }
}
