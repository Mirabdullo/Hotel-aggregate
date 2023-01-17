import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Owner } from './entities/owner.entity';
import { LoginDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { OnlyAdminGuards } from '../guards/all-admins.guard';
import { AdminOrUser } from '../guards/jwtAdminUser.guard';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @ApiOperation({summary: 'Mulkdor qoshish'})
  @ApiResponse({status: 201, type: Owner})
  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto, @Res({ passthrough: true })res: Response ) {
    return this.ownerService.create(createOwnerDto, res);
  }

  @ApiOperation({summary: 'Login qilish'})
  @ApiResponse({status: 201, type: Owner})
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response){
    return this.ownerService.signin(loginDto, res)
  }

  @ApiOperation({summary: 'Chiqish'})
  @ApiResponse({status: 201, type: Owner})
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout/:id')
  logout(
    @Param() id: number,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    console.log();
    res.clearCookie('refresh_token');
    return this.ownerService.logout(+id["id"]);
  }

  @ApiOperation({summary: 'Mulkdorlar royxati'})
  @ApiResponse({status: 201, type: [Owner]})
  @UseGuards(OnlyAdminGuards)
  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @ApiOperation({summary: 'Mulkdorni id boyicha olish'})
  @ApiResponse({status: 201, type: Owner})
  @UseGuards(AdminOrUser)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @ApiOperation({summary: 'Mulkdor malumotlarini ozgartirish'})
  @ApiResponse({status: 201, type: Owner})
  @UseGuards(AdminOrUser)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @ApiOperation({summary: 'Mulkdorni ochirish'})
  @ApiResponse({status: 201, type: Owner})
  @UseGuards(AdminOrUser)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
