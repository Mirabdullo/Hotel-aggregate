import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Facility } from './entities/facility.entity';

@ApiTags('Facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @ApiOperation({summary: 'Jihozlarni qoshish'})
  @ApiResponse({status: 201, type: Facility})
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilitiesService.create(createFacilityDto);
  }

  @ApiOperation({summary: 'Jihozlar royxati'})
  @ApiResponse({status: 201, type: Facility})
  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @ApiOperation({summary: 'Jihozni id boyicha bittasini olish'})
  @ApiResponse({status: 201, type: Facility})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(+id);
  }

  @ApiOperation({summary: 'Jihoz nomini ozgartirish'})
  @ApiResponse({status: 201, type: Facility})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDto) {
    return this.facilitiesService.update(+id, updateFacilityDto);
    
  }

  @ApiOperation({summary: 'Jihozni ochirish'})
  @ApiResponse({status: 201, type: Facility})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(+id);
  }
}
