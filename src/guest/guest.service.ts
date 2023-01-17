import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest) private guestRepository: typeof Guest,
    private readonly tokensService: TokensService,
  ) {}
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

      const token = await this.tokensService.getTokens(guest.id, guest.email);
      await this.tokensService.updateRefreshTokenHash(guest.id, token.refresh_token, res);

      await this.tokensService.writeCookie(token.refresh_token, res)
      return {
        ...guest,
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
      const owner = await this.guestRepository.findOne({
          where: {email}
      })
  
      if(!owner){
          throw new ForbiddenException("Ro'yxatdan o'ting")
      }
  
      const passwordMatches = await bcrypt.compare(password, owner.password)
      if(!passwordMatches) throw new ForbiddenException("Email yoki parol noto'g'ri")
  
      const tokens = await this.tokensService.getTokens(owner.id, owner.email)
      await this.tokensService.updateRefreshTokenHash(owner.id, tokens.refresh_token, this.guestRepository)
  
      await this.tokensService.writeCookie(tokens.refresh_token, res)
      return {
        ...owner,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      }
    }
  
    async logout(id: number) {
      try {
        const customer = await this.guestRepository.findByPk(id)
        if(!customer){
          throw new HttpException('Malumot topilmadi', HttpStatus.NOT_FOUND)
        }
        const user = await this.guestRepository.update({
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
      await this.guestRepository.destroy({ where: { id } });
      return {
        messaga: "Ma'lumot o'chirildi",
        ...Guest,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Serverda xatolik');
    }
  }


}
