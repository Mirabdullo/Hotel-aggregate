import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacilitiesPlaceDto } from './dto/create-facilities_place.dto';
import { UpdateFacilitiesPlaceDto } from './dto/update-facilities_place.dto';
import { FacilitiesPlace } from './entities/facilities_place.entity';

@Injectable()
export class FacilitiesPlaceService {
  constructor(
    @InjectRepository(FacilitiesPlace) private facilitiesPlaceRepository: Repository<FacilitiesPlace>
  ){}
  async create(createFacilitiesPlaceDto: CreateFacilitiesPlaceDto) {
    try {
      console.log("FacilitiesPlace");
      return await this.facilitiesPlaceRepository.save(createFacilitiesPlaceDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.facilitiesPlaceRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findOneBy({id})
      return FacilitiesPlace
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateFacilitiesPlaceDto: UpdateFacilitiesPlaceDto) {
    try {
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findOneBy({id})
      if(!FacilitiesPlace) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.facilitiesPlaceRepository.update(updateFacilitiesPlaceDto, {id})
      return await this.facilitiesPlaceRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const FacilitiesPlace = await this.facilitiesPlaceRepository.findOneBy({id})
      if(!FacilitiesPlace) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.facilitiesPlaceRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...FacilitiesPlace
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}