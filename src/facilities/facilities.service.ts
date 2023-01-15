import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility) private facilityRepository: Repository<Facility>
  ){}
  async create(createFacilityDto: CreateFacilityDto) {
    try {
      console.log("Facility");
      return await this.facilityRepository.save(createFacilityDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.facilityRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Facility = await this.facilityRepository.findOneBy({id})
      return Facility
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    try {
      const Facility = await this.facilityRepository.findOneBy({id})
      if(!Facility) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.facilityRepository.update(updateFacilityDto, {id})
      return await this.facilityRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const facility = await this.facilityRepository.findOneBy({id})
      if(!facility) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.facilityRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...facility
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
