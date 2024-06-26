import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request as IRequest } from "express";

import { OffersService } from './offers.service';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface RequestUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOffer(@Req() req: RequestUser, @Body() createOfferDto: CreateOfferDto): Promise<Record<string, never>> {
    await this.offersService.createOffer(req.user, createOfferDto);
    return {};
  }

  @Get()
  async findOffers(): Promise<Offer[]> {
    return await this.offersService.findOffers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOffer(@Param('id') id: number): Promise<Offer> {
    return await this.offersService.getOffer(id);
  }
}