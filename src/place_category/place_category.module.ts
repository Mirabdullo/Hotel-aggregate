import { Module } from '@nestjs/common';
import { PlaceCategoryService } from './place_category.service';
import { PlaceCategoryController } from './place_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceCategory } from './entities/place_category.entity';

@Module({
  imports: [SequelizeModule.forFeature([PlaceCategory])],
  controllers: [PlaceCategoryController],
  providers: [PlaceCategoryService],
})
export class PlaceCategoryModule {}
