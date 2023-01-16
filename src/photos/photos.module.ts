import { forwardRef, Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './entities/photo.entity';
import { PlaceModule } from '../place/place.module';
import { HotelModule } from '../hotel/hotel.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Photo]),
    forwardRef(() => PlaceModule),
    forwardRef(() => HotelModule),
    FilesModule
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
