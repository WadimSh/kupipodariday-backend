import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { SigninUserResponseDto } from "./dto/signin-user-response.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async loginUser(@Request() req): Promise<SigninUserResponseDto> {
    return this.authService.loginUser(req.user);
  }

  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return this.authService.loginUser(user);
  }
}