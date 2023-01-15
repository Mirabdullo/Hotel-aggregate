import { forwardRef, Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PlaceModule } from '../place/place.module';
import { HotelModule } from '../hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]),
  forwardRef(() => PlaceModule),
  forwardRef(() => HotelModule)
  ],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
