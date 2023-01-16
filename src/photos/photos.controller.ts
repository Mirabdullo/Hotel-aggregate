import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Photo } from './entities/photo.entity';

@ApiTags('Photo')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({summary: 'Rasm qoshish'})
  @ApiResponse({status: 201, type: Photo})
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() createPhotoDto: CreatePhotoDto, @UploadedFile() photo) {
    return this.photosService.create(createPhotoDto, photo);
  }

  @ApiOperation({summary: 'Rasmlar royxati'})
  @ApiResponse({status: 201, type: [Photo]})
  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @ApiOperation({summary: 'Rasm id boyicha bittasi'})
  @ApiResponse({status: 201, type: Photo})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @ApiOperation({summary: 'Rasmni ozgartirish'})
  @ApiResponse({status: 201, type: Photo})
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto, @UploadedFile() photo) {
    return this.photosService.update(+id, updatePhotoDto, photo);
  }

  @ApiOperation({summary: 'Rasm ochirish'})
  @ApiResponse({status: 201, type: Photo})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
