import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      console.log("category");
      return await this.categoryRepository.save(createCategoryDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({id})
      return category
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOneBy({id})
      if(!category) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      const newCategory = await this.categoryRepository.update(updateCategoryDto, {id})
      return newCategory 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({id})
      if(!category) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.categoryRepository.delete({id})
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}
