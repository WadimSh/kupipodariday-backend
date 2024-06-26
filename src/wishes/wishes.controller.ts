import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request as IRequest } from "express";

import { WishesService } from './wishes.service';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface RequestUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWish(@Req() req: RequestUser, @Body() createWishDto: CreateWishDto): Promise<Record<string, never>> {
    await this.wishesService.createWish(req.user.id, createWishDto);
    return {};
  }

  @Get('last')
  async findLast(): Promise<Wish[]> {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async findTop(): Promise<Wish[]> {
    return await this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWish(@Param('id') id: number) {
    return await this.wishesService.getWish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateWish(@Req() req: RequestUser, @Param('id') id: number, @Body() updateWishDto: UpdateWishDto): Promise<Record<string, never>> {
    await this.wishesService.updateWish(req.user, id, updateWishDto);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeWish(@Req() req: RequestUser, @Param('id') id: number): Promise<Wish> {
    return await this.wishesService.removeWish(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Req() req: RequestUser, @Param('id') id: number): Promise<Record<string, never>> {
    await this.wishesService.copyWish(req.user, id);
    return {};
  }
}