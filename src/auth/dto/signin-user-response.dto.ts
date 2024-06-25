import { IsNotEmpty, IsString } from "class-validator";

export class SigninUserResponseDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}