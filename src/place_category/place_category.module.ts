import { Module } from '@nestjs/common';
import { PlaceCategoryService } from './place_category.service';
import { PlaceCategoryController } from './place_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceCategory } from './entities/place_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceCategory])],
  controllers: [PlaceCategoryController],
  providers: [PlaceCategoryService]
})
export class PlaceCategoryModule {}
