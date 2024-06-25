import { IsString, IsUrl, Length, IsDate, IsNumber } from "class-validator";

export class UserPublicProfileResponseDto {
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
}