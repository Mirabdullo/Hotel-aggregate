import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilitiesPlaceService } from './facilities_place.service';
import { CreateFacilitiesPlaceDto } from './dto/create-facilities_place.dto';
import { UpdateFacilitiesPlaceDto } from './dto/update-facilities_place.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FacilitiesPlace } from './entities/facilities_place.entity';

@ApiTags('Facility Place')
@Controller('facilities-place')
export class FacilitiesPlaceController {
  constructor(private readonly facilitiesPlaceService: FacilitiesPlaceService) {}

  @ApiOperation({summary: 'Jihozlar va Yotoqlarnni qoshish'})
  @ApiResponse({status: 201, type: FacilitiesPlace})
  @Post()
  create(@Body() createFacilitiesPlaceDto: CreateFacilitiesPlaceDto) {
    return this.facilitiesPlaceService.create(createFacilitiesPlaceDto);
  }

  @ApiOperation({summary: 'Jihozlar va Yotoqlarn royxati'})
  @ApiResponse({status: 201, type: FacilitiesPlace})
  @Get()
  findAll() {
    return this.facilitiesPlaceService.findAll();
  }

  @ApiOperation({summary: 'Jihozlar va Yotoqlarnni id boyicha bittasini olish'})
  @ApiResponse({status: 201, type: FacilitiesPlace})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesPlaceService.findOne(+id);
  }

  @ApiOperation({summary: 'Jihozlar va Yotoqlarnni ozgartirish'})
  @ApiResponse({status: 201, type: FacilitiesPlace})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacilitiesPlaceDto: UpdateFacilitiesPlaceDto) {
    return this.facilitiesPlaceService.update(+id, updateFacilitiesPlaceDto);
  }

  @ApiOperation({summary: 'Jihozlar va Yotoqlarnni ochirish'})
  @ApiResponse({status: 201, type: FacilitiesPlace})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesPlaceService.remove(+id);
  }
}
