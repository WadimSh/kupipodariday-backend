import { IsString } from "class-validator";

export class FindUsersDto {
  @IsString()
  query: string;
}