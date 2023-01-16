import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
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
    @InjectModel(Photo) private photoRepository: typeof Photo,
    private readonly hotelService: HotelService,
    private readonly placeService: PlaceService,
    private readonly fileService: FilesService
  ) {}
  async create(createPhotoDto: CreatePhotoDto, photo: any) {
    try {
      const id = Number(createPhotoDto.hotel_or_place_id)
      if (
        !(
          createPhotoDto.table_name == 'Place' ||
          createPhotoDto.table_name == 'Hotel'
        )
      ) {
        throw new HttpException(
          'Place yoki Hotel nomini kiriting!',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
      if (
        createPhotoDto.table_name == 'Place' &&
        !(await this.placeService.findOne(id))
      ) {
        throw new HttpException(
          'Table name yoki id notogri',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        createPhotoDto.table_name == 'Hotel' &&
        !(await this.placeService.findOne(id))
      ) {
        throw new HttpException(
          'Table name yoki id notogri',
          HttpStatus.BAD_REQUEST,
        );
      }
      const fileName = await this.fileService.createFile(photo);
      const photos = await this.photoRepository.create({
        ...createPhotoDto,
        photo: fileName,
      });
      return photos
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.photoRepository.findAll({
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
      const Photo = await this.photoRepository.findByPk(id, {
        include: { all: true },
      });
      return Photo;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto, photo: any) {
    try {
      const Photo = await this.photoRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Photo)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      if (
        !(
          updatePhotoDto.table_name == 'Place' ||
          updatePhotoDto.table_name == 'Hotel'
        )
      ) {
        throw new HttpException(
          'Place yoki Hotel nomini kiriting!',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
      if (
        updatePhotoDto.table_name == 'Place' &&
        !(await this.placeService.findOne(id))
      ) {
        throw new HttpException(
          'Table name yoki id notogri',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        updatePhotoDto.table_name == 'Hotel' &&
        !(await this.hotelService.findOne(id))
      ) {
        throw new HttpException(
          'Table name yoki id notogri',
          HttpStatus.BAD_REQUEST,
        );
      }
      if(photo){
        await this.fileService.removeFile(Photo.photo)
        const fileName = await this.fileService.createFile(photo);
        
        return this.photoRepository.update({
          ...updatePhotoDto,
          photo: fileName
        },{where: {id}, returning: true})
  
      }
      return this.photoRepository.update(updatePhotoDto, {
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
      const Photo = await this.photoRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Photo)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.photoRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Photo,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
