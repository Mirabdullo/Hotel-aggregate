import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import * as bcrypt from 'bcryptjs'
import { Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner) private ownerRepository: typeof Owner,
    private readonly jwtService: JwtService,
  ) {}
  /////////////////////<<<<<<<<<<<SIGNUP>>>>>>>>>>>>>//////////////////

  async create(createOwnerDto: CreateOwnerDto, res: Response) {
    try {
      const candidate = await this.ownerRepository.findOne({
        where: { email: createOwnerDto.email },
      });
      if (candidate) {
        return new HttpException(
          'Bunday fordalanuvchi allaqachon mavjud',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPAssword = await bcrypt.hash(createOwnerDto.password, 7);
      const owner = await this.ownerRepository.create({
        ...createOwnerDto,
        password: hashedPAssword,
      });

      const token = await this.getTokens(owner.id, owner.email);
      await this.updateRefreshTokenHash(owner.id, token.refresh_token);

      res.cookie('refresh_token', token.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return {
        ...owner.dataValues,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }


  /////////////////////<<<<<<<<<<<SIGNIN>>>>>>>>>>>>>//////////////////
  async signin(loginDto: LoginDto, res: Response) {
    const {email, password} = loginDto
    const owner = await this.ownerRepository.findOne({
        where: {email}
    })

    if(!owner){
        throw new ForbiddenException("Ro'yxatdan o'ting")
    }

    const passwordMatches = await bcrypt.compare(password, owner.password)
    if(!passwordMatches) throw new ForbiddenException("Email yoki parol noto'g'ri")

    const tokens = await this.getTokens(owner.id, owner.email)
    await this.updateRefreshTokenHash(owner.id, tokens.refresh_token)

    res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    return {
      ...owner,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    }
  }

  async logout(id: number) {
    try {
      const customer = await this.ownerRepository.findByPk(id)
      if(!customer){
        throw new HttpException('Malumot topilmadi', HttpStatus.NOT_FOUND)
      }
      const user = await this.ownerRepository.update({
        refresh_token: null
      },{ where: {id:+id}})
      if(!user) throw new ForbiddenException('Access denide')
      return true
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik')
    }
  }

  async findAll() {
    try {
      const categories = await this.ownerRepository.findAll({
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
      const owner = await this.ownerRepository.findByPk(id, {
        include: { all: true },
      });
      return owner;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    try {
      const owner = await this.ownerRepository.findByPk(id, {
        include: { all: true },
      });
      if (!owner)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.ownerRepository.update(updateOwnerDto, {
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
      const owner = await this.ownerRepository.findByPk(id, {
        include: { all: true },
      });
      if (!owner)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.ownerRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...owner,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async getTokens(id: number, email: string) {
    const jwtPayload = {
      sub: id,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.ownerRepository.update(
      {
        refresh_token: hashedRefreshToken,
      },
      { where: { id }, returning: true },
    );
  }
}
