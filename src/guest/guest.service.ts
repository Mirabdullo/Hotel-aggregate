import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';


@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest) private guestRepository: Repository<Guest>  
  ){}
   async create(createGuestDto: CreateGuestDto) {
    try {
      console.log("Guest");
      return await this.guestRepository.save(createGuestDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.guestRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Guest = await this.guestRepository.findOneBy({id})
      return Guest
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateGuestDto: UpdateGuestDto) {
    try {
      const Guest = await this.guestRepository.findOneBy({id})
      if(!Guest) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.guestRepository.update(updateGuestDto, {id})
      return await this.guestRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Guest = await this.guestRepository.findOneBy({id})
      if(!Guest) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.guestRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Guest
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}