import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guest } from './entities/guest.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Guest]), JwtModule],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
