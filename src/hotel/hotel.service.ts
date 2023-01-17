import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel) private hotelRepository: typeof Hotel,
  ) {}
  async create(createHotelDto: CreateHotelDto) {
    try {
      console.log('Hotel');
      return await this.hotelRepository.create(createHotelDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try { 
      const categories = await this.hotelRepository.findAll({
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
      const Hotel = await this.hotelRepository.findByPk(id, {
        include: { all: true },
      });
      if(!Hotel) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)

      return Hotel;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const Hotel = await this.hotelRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Hotel)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.hotelRepository.update(updateHotelDto, {
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
      const Hotel = await this.hotelRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Hotel)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.hotelRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Hotel,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
