import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateHotelServiceDto } from './dto/create-hotel_service.dto';
import { UpdateHotelServiceDto } from './dto/update-hotel_service.dto';
import { HotelService } from './entities/hotel_service.entity';

@Injectable()
export class HotelServiceService {
  constructor(
    @InjectModel(HotelService)
    private hotelServiceRepository: typeof HotelService,
  ) {}
  async create(createHotelServiceDto: CreateHotelServiceDto) {
    try {
      console.log('HotelService');
      return await this.hotelServiceRepository.create(createHotelServiceDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.hotelServiceRepository.findAll({
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
      const HotelService = await this.hotelServiceRepository.findByPk(id, {
        include: { all: true },
      });
      return HotelService;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateHotelServiceDto: UpdateHotelServiceDto) {
    try {
      const HotelService = await this.hotelServiceRepository.findByPk(id, {
        include: { all: true },
      });
      if (!HotelService)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.hotelServiceRepository.update(updateHotelServiceDto, {where: { id }, returning: true});
      return await this.hotelServiceRepository.findByPk(id, {
        include: { all: true },
      });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const HotelService = await this.hotelServiceRepository.findByPk(id, {
        include: { all: true },
      });
      if (!HotelService)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.hotelServiceRepository.destroy({
        where: { id }
      });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...HotelService,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
