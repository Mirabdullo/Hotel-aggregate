import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService ,
    private readonly tokensService: TokensService
  ){}
  async create(createAdminDto: CreateAdminDto, res: Response) {
    const candidate = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (candidate) {
      throw new HttpException(
        'Bunday fordalanuvchi allaqachon mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPAssword = await bcrypt.hash(createAdminDto.password, 7);
    const admin = await this.adminRepository.create({
      ...createAdminDto,
      password: hashedPAssword,
    });

    const token = await this.tokensService.getTokens(admin.id, admin.email, admin.is_creator, admin.is_active);

    await this.tokensService.updateRefreshTokenHash(admin.id, token.refresh_token, this.adminRepository)
    
    await this.tokensService.writeCookie(token.refresh_token, res)

    return {
      ...admin.dataValues,
      access_token: token.access_token,
      refresh_token: token.refresh_token
    }
  }


  async signin(loginDto: LoginDto, res: Response) {
    const {email, password} = loginDto
    const admin = await this.adminRepository.findOne({
        where: {email}
    })
    if(!admin){
        throw new ForbiddenException("Ro'yxatdan o'ting")
    }


    const passwordMatches = await bcrypt.compare(password, admin.password)
    if(!passwordMatches) throw new ForbiddenException("Access Denide1")

    const tokens = await this.tokensService.getTokens(admin.id, admin.email, admin.is_creator, admin.is_active)
    await this.tokensService.updateRefreshTokenHash(admin.id, tokens.refresh_token, this.adminRepository)

    await this.tokensService.writeCookie(tokens.refresh_token, res)

    return {
      ...admin.dataValues,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    }
  }


  async logout(id: number) {
    try {
      const admin = await this.adminRepository.findByPk(id)
      if(!admin){
        throw new HttpException('Malumot topilmadi', HttpStatus.NOT_FOUND)
      }
      const user = await this.adminRepository.update({
        refresh_token: null
      },{where: {id}})
      console.log(user);
      if(!user) throw new ForbiddenException('Access denide2')
      return true
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }


  async ActivateAdmin(id: number){
    try {
      const admin = await this.adminRepository.findOne({where: {id}})
      if(!admin) throw new HttpException("Admin topilmadi", HttpStatus.NOT_FOUND)
      return this.adminRepository.update({
        is_active: true
      }, {where: {id}, returning: true})
    } catch (error) {
      throw new HttpException("Serverda xatolik", HttpStatus.FORBIDDEN)
    }
  }

  async findAll() {
    try {
      const categories = await this.adminRepository.findAll()
      return categories
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findOne(id: number) {
    try {
      const Admin = await this.adminRepository.findOne({where: {id}})
      return Admin
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const Admin = await this.adminRepository.findOne({where: {id}})
      if(!Admin) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      const newAdmin = await this.adminRepository.update(updateAdminDto, {where: {id}})
      return newAdmin 
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async remove(id: number) {
    try {
      const Admin = await this.adminRepository.findOne({where: {id}})
      if(!Admin) throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND)
      return await this.adminRepository.destroy({where: {id}})
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

}
