import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>
  ){}
  async create(createHotelDto: CreateHotelDto) {
    try {
      console.log("Hotel");
      return await this.hotelRepository.save(createHotelDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.hotelRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Hotel = await this.hotelRepository.findOneBy({id})
      return Hotel
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const Hotel = await this.hotelRepository.findOneBy({id})
      if(!Hotel) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.hotelRepository.update(updateHotelDto, {id})
      return await this.hotelRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Hotel = await this.hotelRepository.findOneBy({id})
      if(!Hotel) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.hotelRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Hotel
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
