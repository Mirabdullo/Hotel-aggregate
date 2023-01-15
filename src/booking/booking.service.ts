import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>
  ){}
  async create(createBookingDto: CreateBookingDto) {
    try {
      console.log("Booking");
      return await this.bookingRepository.save(createBookingDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.bookingRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Booking = await this.bookingRepository.findOneBy({id})
      return Booking
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const Booking = await this.bookingRepository.findOneBy({id})
      if(!Booking) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      const newBooking = await this.bookingRepository.update(updateBookingDto, {id})
      return newBooking 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Booking = await this.bookingRepository.findOneBy({id})
      if(!Booking) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.bookingRepository.delete({id})
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
