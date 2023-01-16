import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guest } from './entities/guest.entity';

@ApiTags('Guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @ApiOperation({summary: 'Foydalanuvchi qoshish'})
  @ApiResponse({status: 201, type: Guest})
  @Post()
  create(@Body() createGuestDto: CreateGuestDto, @Res({ passthrough: true })res: Response) {
    return this.guestService.create(createGuestDto, res);
  }

  @ApiOperation({summary: 'Foydalanuvchlar royxati'})
  @ApiResponse({status: 201, type: [Guest]})
  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @ApiOperation({summary: 'Foydalanuvchi'})
  @ApiResponse({status: 201, type: Guest})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(+id);
  }

  @ApiOperation({summary: 'Foydalanuvchi malumotlarini ozgartirish'})
  @ApiResponse({status: 201, type: Guest})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(+id, updateGuestDto);
  }

  @ApiOperation({summary: 'Foydalanuvchini ochirish'})
  @ApiResponse({status: 201, type: Guest})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestService.remove(+id);
  }
}
