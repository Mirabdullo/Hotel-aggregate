import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateFacilitiesPlaceDto } from './dto/create-facilities_place.dto';
import { UpdateFacilitiesPlaceDto } from './dto/update-facilities_place.dto';
import { FacilitiesPlace } from './entities/facilities_place.entity';

@Injectable()
export class FacilitiesPlaceService {
  constructor(
    @InjectModel(FacilitiesPlace)
    private facilitiesPlaceRepository: typeof FacilitiesPlace,
  ) {}
  async create(createFacilitiesPlaceDto: CreateFacilitiesPlaceDto) {
    try {
      console.log('FacilitiesPlace');
      return await this.facilitiesPlaceRepository.create(
        createFacilitiesPlaceDto,
      );
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.facilitiesPlaceRepository.findAll({
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
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findByPk(
        id,
        { include: { all: true } },
      );
      return FacilitiesPlace;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateFacilitiesPlaceDto: UpdateFacilitiesPlaceDto) {
    try {
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findByPk(
        id,
        { include: { all: true } },
      );
      if (!FacilitiesPlace)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.facilitiesPlaceRepository.update(updateFacilitiesPlaceDto, {where: {
        id,
      }, returning : true});
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findByPk(
        id,
        { include: { all: true } },
      );
      if (!FacilitiesPlace)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.facilitiesPlaceRepository.destroy({where: { id }});
      return {
        messaga: "Ma'lumot o'chirildi",
        ...FacilitiesPlace,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
