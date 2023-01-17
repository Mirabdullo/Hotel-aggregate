import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './entities/owner.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Owner]), JwtModule],
  controllers: [OwnerController],
  providers: [OwnerService]
})
export class OwnerModule {}
