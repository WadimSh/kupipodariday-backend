import { IsNumber, IsString, IsUrl, Length } from "class-validator";

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}