import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>  
  ){}
   async create(createPlaceDto: CreatePlaceDto) {
    try {
      console.log("Place");
      return await this.placeRepository.save(createPlaceDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.placeRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Place = await this.placeRepository.findOneBy({id})
      return Place
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    try {
      const Place = await this.placeRepository.findOneBy({id})
      if(!Place) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.placeRepository.update(updatePlaceDto, {id})
      return await this.placeRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Place = await this.placeRepository.findOneBy({id})
      if(!Place) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.placeRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Place
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}