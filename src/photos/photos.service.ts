import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../hotel/entities/hotel.entity';
import { HotelService } from '../hotel/hotel.service';
import { Place } from '../place/entities/place.entity';
import { PlaceService } from '../place/place.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private readonly hotelService: HotelService,
    private readonly placeService: PlaceService
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    try {
      if(!(createPhotoDto.table_name == "Place" || createPhotoDto.table_name == 'Hotel')){
        throw new HttpException("Place yoki Hotel nomini kiriting!", HttpStatus.FAILED_DEPENDENCY)
      }
      if(createPhotoDto.table_name == "Place" && !(await this.hotelService.findOne(createPhotoDto.hotel_or_place_id))){
        throw new HttpException('Table name yoki id notogri', HttpStatus.BAD_REQUEST)
      }
      if(createPhotoDto.table_name == "Hotel" && !(await this.placeService.findOne(createPhotoDto.hotel_or_place_id))){
        throw new HttpException('Table name yoki id notogri', HttpStatus.BAD_REQUEST)
      }
      return await this.photoRepository.save(createPhotoDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.photoRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Photo = await this.photoRepository.findOneBy({id})
      return Photo
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    try {
      const Photo = await this.photoRepository.findOneBy({id})
      if(!Photo) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      if(!(updatePhotoDto.table_name == "Place" || updatePhotoDto.table_name == 'Hotel')){
        throw new HttpException("Place yoki Hotel nomini kiriting!", HttpStatus.FAILED_DEPENDENCY)
      }
      if(updatePhotoDto.table_name == "Place" && !(await this.hotelService.findOne(updatePhotoDto.hotel_or_place_id))){
        throw new HttpException('Table name yoki id notogri', HttpStatus.BAD_REQUEST)
      }
      if(updatePhotoDto.table_name == "Hotel" && !(await this.placeService.findOne(updatePhotoDto.hotel_or_place_id))){
        throw new HttpException('Table name yoki id notogri', HttpStatus.BAD_REQUEST)
      }
      await this.photoRepository.update(updatePhotoDto, {id})
      return await this.photoRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Photo = await this.photoRepository.findOneBy({id})
      if(!Photo) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.photoRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Photo
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}