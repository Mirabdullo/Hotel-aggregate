import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    try {
      console.log('Comment');
      return await this.commentRepository.create(createCommentDto);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.commentRepository.findAll({include: {all: true}});
      return categories;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findOne(id: number) {
    try {
      const Comment = await this.commentRepository.findByPk(id, {include: {all: true}});
      return Comment;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const Comment = await this.commentRepository.findByPk(id);
      if (!Comment)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.commentRepository.update(updateCommentDto, {where: { id }, returning: true});
      
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async remove(id: number) {
    try {
      const Comment = await this.commentRepository.findByPk(id);
      if (!Comment)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.commentRepository.destroy({where: { id }});
      return {
        messaga: "Ma'lumot o'chirildi",
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }
}
