import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      console.log('category');
      return await this.categoryRepository.create(createCategoryDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.findAll({
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
      const category = await this.categoryRepository.findByPk(id, {
        include: { all: true },
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findByPk(id);
      if (!category)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      const newCategory = await this.categoryRepository.update(
        updateCategoryDto,
        { where: { id }, returning: true },
      );
      return newCategory;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findByPk(id);
      if (!category)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.categoryRepository.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
