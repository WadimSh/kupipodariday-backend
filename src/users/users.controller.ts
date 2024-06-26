import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request as IRequest } from "express";

import { UsersService } from './users.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

export interface RequestOneUser extends IRequest {
  user: UserProfileResponseDto;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@Req() req: RequestOneUser) {
    return req.user;
  }

  @Patch('me')
  async updateOne(@Req() req: RequestOneUser, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateOne(req.user.id, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  async findOneUserWishes(@Req() req: RequestOneUser) {
    return await this.usersService.findOneUserWishes(req.user.id);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.getUser(username);
    return user;
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    const wishes = await this.usersService.getUserWishes(username);
    return wishes;
  }

  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto) {
    return await this.usersService.findMany(findUsersDto.query);
  }
}