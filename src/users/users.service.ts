import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { UserProfileResponseDto } from "./dto/user-profile-response.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const isUser = await this.userRepository.findBy([
      { username: createUserDto.username },
      { email: createUserDto.email },
    ]);

    if (isUser.length > 0)
      throw new ConflictException('Пользователь с таким именем и email уже зарегистрирован');

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const userDto = {
      ...createUserDto,
      password: hashPassword,
    };

    const user = await this.userRepository.save(userDto);
    return user;
  }

  async findUserByName(username: string): Promise<CreateUserDto> {
    const user: CreateUserDto = await this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect(['user.email', 'user.password'])
      .getOne();
    return user;
  }

  async findUserById(id: number) {
    const user: UserProfileResponseDto = await this.userRepository.findOneBy({ id });
    return user;
  }
}