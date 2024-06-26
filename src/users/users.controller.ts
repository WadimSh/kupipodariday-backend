import { Controller, Get, Post, Body, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { Request as IRequest } from "express";

import { UsersService } from './users.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export interface RequestOneUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findOne(@Req() req: RequestOneUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateOne(@Req() req: RequestOneUser, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateOne(req.user.id, updateUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async findOneUserWishes(@Req() req: RequestOneUser) {
    return await this.usersService.findOneUserWishes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.getUser(username);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    const wishes = await this.usersService.getUserWishes(username);
    return wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto) {
    return await this.usersService.findMany(findUsersDto.query);
  }
}