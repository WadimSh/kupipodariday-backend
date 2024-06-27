import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Wishlist } from "./entities/wishlist.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { UserProfileResponseDto } from "src/users/dto/user-profile-response.dto";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}
  
  async findWishlists(user: UserProfileResponseDto) {
    return await this.wishlistRepository.findBy({ owner: { id: user.id } });
  }

  async createWishlist(user: UserProfileResponseDto, createWishlistDto: CreateWishlistDto) {
    const { name, image, itemsId } = createWishlistDto;
    const wishes = await this.wishRepository.findBy({ id: In(itemsId) });
    return await this.wishlistRepository.save({
      name,
      image,
      owner: user,
      items: wishes,
    });
  }

  async getWishlist(user: UserProfileResponseDto, id: number) {
    return await this.wishlistRepository.findOne({
      where: { id, owner: { id: user.id } },
      relations: { owner: true, items: true },
    });
  }

  async updateWishlist(user: UserProfileResponseDto, id: number, updateWishlistDto: UpdateWishlistDto) {
    const { itemsId, ...wishlist } = updateWishlistDto;
    if (!itemsId) {
      const wishes = await this.wishRepository.findBy({ id: In(updateWishlistDto.itemsId) });
      wishlist['items'] = wishes;
    };
    const { affected } = await this.wishlistRepository.update(
      { id, owner: { id: user.id } },
      wishlist,
    );
    if (!affected) {
      throw new BadRequestException('Данного вишлиста нет');
    };
    return await this.wishlistRepository.findOneBy({ id });
  }

  async removeWishlist(user: UserProfileResponseDto, id: number) {
    const wishlist = await this.getWishlist(user, id);
    if (!wishlist) {
      throw new BadRequestException('Данного вишлиста нет');
    };
    await this.wishlistRepository.delete({
      owner: { id: user.id },
      id,
    });
    return wishlist;
  }
}