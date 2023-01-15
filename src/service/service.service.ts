import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ){}
  async create(createServiceDto: CreateServiceDto) {
    try {
      console.log("Service");
      return await this.serviceRepository.save(createServiceDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.serviceRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Service = await this.serviceRepository.findOneBy({id})
      return Service
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const Service = await this.serviceRepository.findOneBy({id})
      if(!Service) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.serviceRepository.update(updateServiceDto, {id})
      return await this.serviceRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Service = await this.serviceRepository.findOneBy({id})
      if(!Service) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.serviceRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Service
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
