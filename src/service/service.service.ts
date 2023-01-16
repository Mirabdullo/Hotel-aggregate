import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service) private serviceRepository: typeof Service,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    try {
      console.log('Service');
      return await this.serviceRepository.create(createServiceDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.serviceRepository.findAll({
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
      const Service = await this.serviceRepository.findByPk(id, {
        include: { all: true },
      });
      return Service;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const Service = await this.serviceRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Service)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.serviceRepository.update(updateServiceDto, {where: { id }, returning: true});

    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const Service = await this.serviceRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Service)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.serviceRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Service,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
