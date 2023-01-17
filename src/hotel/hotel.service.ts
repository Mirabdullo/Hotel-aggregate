import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { strict } from 'assert';
import { Request, Response } from 'express';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel) private hotelRepository: typeof Hotel,
  private readonly jwtService: JwtService
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

  async update(id: number, updateHotelDto: UpdateHotelDto, req: Request) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      if(!token) throw new HttpException('Ruxsat etilmagan foydalanuuvchi', HttpStatus.UNAUTHORIZED)
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      const Hotel = await this.hotelRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Hotel)
      throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      if(!user.is_active && user.sub != Hotel.owner_id){
        return new HttpException("Ruxsat etilmagan foydalanuvchi", HttpStatus.UNAUTHORIZED)
      }
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
