import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceCategoryService } from './place_category.service';
import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { UpdatePlaceCategoryDto } from './dto/update-place_category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaceCategory } from './entities/place_category.entity';

@ApiTags('Place category')
@Controller('place-category')
export class PlaceCategoryController {
  constructor(private readonly placeCategoryService: PlaceCategoryService) {}

  @ApiOperation({summary: 'Xona categoriyasini qoshish'})
  @ApiResponse({status: 201, type: PlaceCategory})
  @Post()
  create(@Body() createPlaceCategoryDto: CreatePlaceCategoryDto) {
    return this.placeCategoryService.create(createPlaceCategoryDto);
  }

  @ApiOperation({summary: 'Xona categoriyasini royxati'})
  @ApiResponse({status: 201, type: [PlaceCategory]})
  @Get()
  findAll() {
    return this.placeCategoryService.findAll();
  }

  @ApiOperation({summary: 'Xona categoriyasini id boyicha bittasi'})
  @ApiResponse({status: 201, type: PlaceCategory})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeCategoryService.findOne(+id);
  }

  @ApiOperation({summary: 'Xona categoriyasini ozgartirish'})
  @ApiResponse({status: 201, type: PlaceCategory})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceCategoryDto: UpdatePlaceCategoryDto) {
    return this.placeCategoryService.update(+id, updatePlaceCategoryDto);
  }

  @ApiOperation({summary: 'Xona categoriyasini ochirish'})
  @ApiResponse({status: 201, type: PlaceCategory})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeCategoryService.remove(+id);
  }
}
