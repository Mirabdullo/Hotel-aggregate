import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceCategoryService } from './place_category.service';
import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { UpdatePlaceCategoryDto } from './dto/update-place_category.dto';

@Controller('place-category')
export class PlaceCategoryController {
  constructor(private readonly placeCategoryService: PlaceCategoryService) {}

  @Post()
  create(@Body() createPlaceCategoryDto: CreatePlaceCategoryDto) {
    return this.placeCategoryService.create(createPlaceCategoryDto);
  }

  @Get()
  findAll() {
    return this.placeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceCategoryDto: UpdatePlaceCategoryDto) {
    return this.placeCategoryService.update(+id, updatePlaceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeCategoryService.remove(+id);
  }
}
