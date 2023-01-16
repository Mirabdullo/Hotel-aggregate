import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary: 'Admin qoshish'})
  @ApiResponse({status: 201, type: Admin})
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.signin(loginDto, res);
  }

  @ApiOperation({summary: 'Logout admin'})
  @ApiResponse({status: 201, type: Admin})
  @Post('logout/:id')
  @HttpCode(HttpStatus.OK)
  logout(
    @Param() id: number,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    console.log();
    res.clearCookie('refresh_token');
    return this.adminService.logout(+id['id']);
  }

  @ApiOperation({summary: 'Adminlar royxati'})
  @ApiResponse({status: 201, type: [Admin]})
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({summary: 'Admin bittasi'})
  @ApiResponse({status: 201, type: Admin})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({summary: 'Admin malumotlarini ozgartirish'})
  @ApiResponse({status: 201, type: Admin})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({summary: 'Adminni ochirish'})
  @ApiResponse({status: 201, type: Admin})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
