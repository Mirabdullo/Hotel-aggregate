import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class GuestService {
  constructor(@InjectModel(Guest) private guestRepository: typeof Guest,
  private readonly jwtService: JwtService) {}
  async create(createGuestDto: CreateGuestDto, res: Response) {
    try {
      const candidate = await this.guestRepository.findOne({
        where: { email: createGuestDto.email },
      });
      if (candidate) {
        throw new HttpException(
          'Bunday fordalanuvchi allaqachon mavjud',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const hashedPAssword = await bcrypt.hash(createGuestDto.password, 7);
      const guest = await this.guestRepository.create({
        ...createGuestDto,
        password: hashedPAssword,
      });
  
      const token = await this.getTokens(guest.id, guest.email);
      await this.updateRefreshTokenHash(guest.id, token.refresh_token)
      
      res.cookie('refresh_token', token.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return {
        id: guest.id,
        message: "guest created!",
        access_token: token.access_token,
        refresh_token: token.refresh_token
      }

    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async findAll() {
    try {
      const categories = await this.guestRepository.findAll({
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
      const Guest = await this.guestRepository.findByPk(id, {
        include: { all: true },
      });
      return Guest;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }

  async update(id: number, updateGuestDto: UpdateGuestDto) {
    try {
      const Guest = await this.guestRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Guest)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.guestRepository.update(updateGuestDto, {
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
      const Guest = await this.guestRepository.findByPk(id, {
        include: { all: true },
      });
      if (!Guest)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      await this.guestRepository.destroy({where: {id}});
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Guest,
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
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7)
    await this.guestRepository.update({
      refresh_token: hashedRefreshToken
    }, {where: {id},returning: true})
  }
}
