import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place) private placeRepository: typeof Place) {}
  async create(createPlaceDto: CreatePlaceDto) {
    try {
      console.log('Place');
      return await this.placeRepository.create(createPlaceDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.placeRepository.findAll({
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
      const Place = await this.placeRepository.findByPk(id, {
        include: { all: true },
      });
      return Place;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    try {
      const Place = await this.placeRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Place)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.placeRepository.update(updatePlaceDto, {
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
      const Place = await this.placeRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Place)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.placeRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Place,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
