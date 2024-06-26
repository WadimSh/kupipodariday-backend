import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Wish } from "./entities/wish.entity";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UserProfileResponseDto } from "src/users/dto/user-profile-response.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async createWish(id: number, createWishDto: CreateWishDto) {
    const wish = { ...createWishDto, owner: { id } };
    await this.wishRepository.save(wish);
  }

  async findLast() {
    const wishes: Wish[] = await this.wishRepository.find({ order: { createdAt: 'DESC' }, take: 40 });
    return wishes;
  }

  async findTop() {
    const wishes: Wish[] = await this.wishRepository.find({ order: { copied: 'DESC' }, take: 20 });
    return wishes;
  }

  async getWish(id: number) {
    const wish: Wish = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: {
          user: true,
        },
      },
    });

    if (!wish) {
      throw new NotFoundException('Такого подарка нет');
    };

    const { offers, ...partialWish } = wish;

    const offerRes = offers.map((offer) => {
      const { user, ...rest } = offer;
      return { ...rest, user: user.username };
    });

    return { ...partialWish, offers: offerRes };
  }

  async updateWish(user: UserProfileResponseDto, id: number, updateWishDto: UpdateWishDto) {
    const { affected } = await this.wishRepository.update(
      { owner: { id: user.id }, id, raised: 0 },
      updateWishDto,
    );

    if (!affected) {
      throw new BadRequestException('Это не ваш подарок');
    };
  }

  async removeWish(user: UserProfileResponseDto, id: number) {
    const deletedWish = await this.wishRepository.findOne({
      where: { owner: { id: user.id }, id, raised: 0 },
    });

    if (!deletedWish) {
      throw new BadRequestException('Это не ваш подарок');
    };

    await this.wishRepository.delete({ owner: { id: user.id }, id });

    return deletedWish;
  }

  async copyWish(user: UserProfileResponseDto, WishId: number) {
    const { id, name, link, image, price, description, owner } = await this.wishRepository.findOne({
      where: { id: WishId },
      relations: { owner: true },
    });

    const createWishDto: CreateWishDto = {
      name, 
      link, 
      image, 
      price, 
      description,
    };

    await this.createWish(user.id, createWishDto);

    await this.wishRepository.increment({ id }, 'copied', 1);
  }
}