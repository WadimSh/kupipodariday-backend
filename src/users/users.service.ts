import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { UserProfileResponseDto } from "./dto/user-profile-response.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserPublicProfileResponseDto } from "./dto/user-public-profile-response.dto";

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

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.userRepository.findBy([
      { username: updateUserDto.username },
      { email: updateUserDto.email },
    ]);

    for (const user of users) {
      if (user.id !== id) {
        throw new ConflictException('Такой пользователь уже зарегистрирован');
      }
    }

    if (Object.hasOwn(updateUserDto, 'password')) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        10,
      );
    }

    await this.userRepository.update(id, updateUserDto);
    const user: UserProfileResponseDto = await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .addSelect('user.email')
      .getOne();
    return user;
  }

  async findOneUserWishes(id: number) {
    const wishes: Wish[] = await this.wishRepository.findBy({
      owner: { id },
    });
    return wishes;
  }

  async getUser(username: string) {
    const user: UserPublicProfileResponseDto = await this.userRepository.findOneBy({ username });
    return user;
  }

  async getUserWishes(username: string) {
    const user: UserPublicProfileResponseDto = await this.userRepository.findOneBy({ username });
    const wishes: Wish[] = await this.wishRepository.findBy({ owner: { id: user.id } });
    return wishes;
  }

  async findMany(query: string) {
    const users: UserPublicProfileResponseDto[] = await this.userRepository.findBy([
      { username: Like(`%${query}%`) },
      { email: Like(`%${query}%`) },
    ]);
    return users;
  }
}