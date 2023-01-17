import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}
  async create(createBookingDto: CreateBookingDto) {
    try {
      console.log('Booking');
      return await this.bookingRepository.create(createBookingDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.bookingRepository.findAll({include: {all: true}});
      return categories;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findOne(id: number) {
    try {
      const Booking = await this.bookingRepository.findByPk(id, {include: {all: true}});
      return Booking;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const Booking = await this.bookingRepository.findByPk(id);
      if (!Booking)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      const newBooking = await this.bookingRepository.update(updateBookingDto, {
        where: {
          id,
        }, returning: true
      });
      return newBooking;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const Booking = await this.bookingRepository.findByPk(id);
      if (!Booking)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.bookingRepository.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
