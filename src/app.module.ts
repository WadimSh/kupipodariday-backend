import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    UsersModule,
    OffersModule,
    WishesModule,
    WishlistsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: '127.0.0.1',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: ["dist/*/entities/*.entity.js"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
