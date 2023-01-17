import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guest } from './entities/guest.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [SequelizeModule.forFeature([Guest]), TokensModule, JwtModule],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
