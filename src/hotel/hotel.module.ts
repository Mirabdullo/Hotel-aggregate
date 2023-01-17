import { forwardRef, Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from './entities/hotel.entity';
import { PhotosModule } from '../photos/photos.module';
import { Photo } from '../photos/entities/photo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel]),
    PhotosModule,
    JwtModule
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
