import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ){}
  async create(createCommentDto: CreateCommentDto) {
    try {
      console.log("Comment");
      return await this.commentRepository.save(createCommentDto)
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.commentRepository.find()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Comment = await this.commentRepository.findOneBy({id})
      return Comment
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const Comment = await this.commentRepository.findOneBy({id})
      if(!Comment) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.commentRepository.update(updateCommentDto, {id})
      return await this.commentRepository.findOneBy({id}) 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Comment = await this.commentRepository.findOneBy({id})
      if(!Comment) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      await this.commentRepository.delete({id})
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Comment
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }
}