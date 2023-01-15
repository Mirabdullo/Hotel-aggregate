import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceCategoryDto } from './dto/create-place_category.dto';
import { UpdatePlaceCategoryDto } from './dto/update-place_category.dto';
import { PlaceCategory } from './entities/place_category.entity';

@Injectable()
export class PlaceCategoryService {
  constructor(
    @InjectRepository(PlaceCategory) private placeCategoryRepository: Repository<PlaceCategory>
  ){}
  async create(createPlaceCategoryDto: CreatePlaceCategoryDto) {
    try {
      console.log("PlaceCategory");
      return await this.placeCategoryRepository.save(createPlaceCategoryDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.placeCategoryRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findOneBy({id})
      return PlaceCategory
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updatePlaceCategoryDto: UpdatePlaceCategoryDto) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findOneBy({id})
      if(!PlaceCategory) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.placeCategoryRepository.update(updatePlaceCategoryDto, {id})
      return await this.placeCategoryRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const PlaceCategory = await this.placeCategoryRepository.findOneBy({id})
      if(!PlaceCategory) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.placeCategoryRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...PlaceCategory
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
