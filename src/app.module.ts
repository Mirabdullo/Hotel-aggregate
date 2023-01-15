import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { HotelModule } from './hotel/hotel.module';
import { GuestModule } from './guest/guest.module';
import { BookingModule } from './booking/booking.module';
import { CommentModule } from './comment/comment.module';
import { PlaceModule } from './place/place.module';
import { PlaceCategoryModule } from './place_category/place_category.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { FacilitiesPlaceModule } from './facilities_place/facilities_place.module';
import { RoomModule } from './room/room.module';
import { ServiceModule } from './service/service.module';
import { HotelServiceModule } from './hotel_service/hotel_service.module';
import { CategoryModule } from './category/category.module';
import { PhotosModule } from './photos/photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),

    HotelModule,

    GuestModule,

    BookingModule,

    CommentModule,

    PlaceModule,

    PlaceCategoryModule,

    FacilitiesModule,

    FacilitiesPlaceModule,

    RoomModule,

    ServiceModule,

    HotelServiceModule,

    CategoryModule,

    PhotosModule,

    AdminModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
