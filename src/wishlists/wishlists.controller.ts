import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request as IRequest } from "express";

import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishDto } from 'src/wishes/dto/update-wish.dto';

interface RequestUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findWishlists(@Req() req: RequestUser): Promise<Wishlist[]> {
    return await this.wishlistsService.findWishlists(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWishlist(@Req() req: RequestUser, @Body() createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return await this.wishlistsService.createWishlist(req.user, createWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWishlist(@Req() req: RequestUser, @Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.getWishlist(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateWishlist(@Req() req: RequestUser, @Param('id') id: number, @Body() updateWishDto: UpdateWishDto): Promise<Wishlist> {
    return await this.wishlistsService.updateWishlist(req.user, id, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeWishlist(@Req() req: RequestUser, @Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.removeWishlist(req.user, id);
  }
}