import { Module } from '@nestjs/common';
import { HotelServiceService } from './hotel_service.service';
import { HotelServiceController } from './hotel_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelService } from './entities/hotel_service.entity';

@Module({
  imports: [SequelizeModule.forFeature([HotelService])],
  controllers: [HotelServiceController],
  providers: [HotelServiceService],
})
export class HotelServiceModule {}
