import { Controller, Get, Post, Body, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { Request as IRequest } from "express";

import { UsersService } from './users.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface RequestOneUser extends IRequest {
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
    return await this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async findOneUserWishes(@Req() req: RequestOneUser) {
    return await this.usersService.findOneUserWishes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.usersService.getUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    return await this.usersService.getUserWishes(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto) {
    return await this.usersService.findMany(findUsersDto.query);
  }
}