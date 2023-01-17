import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { ServiceModule } from './service/service.module';
import { HotelServiceModule } from './hotel_service/hotel_service.module';
import { CategoryModule } from './category/category.module';
import { PhotosModule } from './photos/photos.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerModule } from './owner/owner.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      logging: false,
    }),

    HotelModule,

    GuestModule,

    BookingModule,

    CommentModule,

    PlaceModule,

    PlaceCategoryModule,

    FacilitiesModule,

    FacilitiesPlaceModule,

    ServiceModule,

    HotelServiceModule,

    CategoryModule,

    PhotosModule,

    AdminModule,

    OwnerModule,

    TokensModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
