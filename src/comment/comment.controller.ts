import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({summary: 'Comment qoshish'})
  @ApiResponse({status: 201, type: Comment})
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({summary: 'Commentlar royxati'})
  @ApiResponse({status: 201, type: Comment})
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({summary: 'Id boyicha bitta comment'})
  @ApiResponse({status: 201, type: Comment})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({summary: 'Commentni ozgartirish'})
  @ApiResponse({status: 201, type: Comment})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({summary: 'Commentni ochirish'})
  @ApiResponse({status: 201, type: Comment})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
