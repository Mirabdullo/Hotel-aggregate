import { Module } from '@nestjs/common';
import { FacilitiesPlaceService } from './facilities_place.service';
import { FacilitiesPlaceController } from './facilities_place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitiesPlace } from './entities/facilities_place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacilitiesPlace])],
  controllers: [FacilitiesPlaceController],
  providers: [FacilitiesPlaceService]
})
export class FacilitiesPlaceModule {}
