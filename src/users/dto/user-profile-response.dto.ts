import { IsEmail, IsString, IsUrl, Length, IsDate, IsNumber } from "class-validator";

export class UserProfileResponseDto {
  @IsNumber()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @Length(1, 64)
  username: string;

  @IsString()
  @Length(0, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;
}