import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectModel(Facility)
    private facilityRepository: typeof Facility,
  ) {}
  async create(createFacilityDto: CreateFacilityDto) {
    try {
      console.log('Facility');
      return await this.facilityRepository.create(createFacilityDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.facilityRepository.findAll({include: {all: true}});
      return categories;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findOne(id: number) {
    try {
      const Facility = await this.facilityRepository.findByPk(id, {include: {all: true}});
      return Facility;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    try {
      const Facility = await this.facilityRepository.findByPk(id);
      if (!Facility)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.facilityRepository.update(updateFacilityDto, {where: { id }, returning: true});
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const facility = await this.facilityRepository.findByPk(id);
      if (!facility)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.facilityRepository.destroy({where: { id }});
      return {
        messaga: "Ma'lumot o'chirildi",
        ...facility,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
