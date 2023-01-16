import { Module } from '@nestjs/common';
import { FacilitiesPlaceService } from './facilities_place.service';
import { FacilitiesPlaceController } from './facilities_place.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FacilitiesPlace } from './entities/facilities_place.entity';

@Module({
  imports: [SequelizeModule.forFeature([FacilitiesPlace])],
  controllers: [FacilitiesPlaceController],
  providers: [FacilitiesPlaceService],
})
export class FacilitiesPlaceModule {}
