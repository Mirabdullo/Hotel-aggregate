import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { UpdatePlaceCategoryDto } from './dto/update-place_category.dto';
import { PlaceCategory } from './entities/place_category.entity';

@Injectable()
export class PlaceCategoryService {
  constructor(
    @InjectModel(PlaceCategory)
    private placeCategoryRepository: typeof PlaceCategory,
  ) {}
  async create(createPlaceCategoryDto: CreatePlaceCategoryDto) {
    try {
      console.log('PlaceCategory');
      return await this.placeCategoryRepository.create(createPlaceCategoryDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.placeCategoryRepository.findAll({
        include: { all: true },
      });
      return categories;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findOne(id: number) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findByPk(id, {
        include: { all: true },
      });
      return PlaceCategory;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updatePlaceCategoryDto: UpdatePlaceCategoryDto) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findByPk(id, {
        include: { all: true },
      });
      if (!PlaceCategory)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.placeCategoryRepository.update(updatePlaceCategoryDto, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findByPk(id, {
        include: { all: true },
      });
      if (!PlaceCategory)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.placeCategoryRepository.destroy({
        where: { id },
      });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...PlaceCategory,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
