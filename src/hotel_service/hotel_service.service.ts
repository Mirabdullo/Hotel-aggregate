import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelServiceDto } from './dto/create-hotel_service.dto';
import { UpdateHotelServiceDto } from './dto/update-hotel_service.dto';
import { HotelService } from './entities/hotel_service.entity';

@Injectable()
export class HotelServiceService {
  constructor(
    @InjectRepository(HotelService) private hotelServiceRepository: Repository<HotelService>
  ){}
  async create(createHotelServiceDto: CreateHotelServiceDto) {
    try {
      console.log("HotelService");
      return await this.hotelServiceRepository.save(createHotelServiceDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.hotelServiceRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const HotelService = await this.hotelServiceRepository.findOneBy({id})
      return HotelService
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateHotelServiceDto: UpdateHotelServiceDto) {
    try {
      const HotelService = await this.hotelServiceRepository.findOneBy({id})
      if(!HotelService) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.hotelServiceRepository.update(updateHotelServiceDto, {id})
      return await this.hotelServiceRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const HotelService = await this.hotelServiceRepository.findOneBy({id})
      if(!HotelService) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.hotelServiceRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...HotelService
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}