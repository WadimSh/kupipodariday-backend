import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Offer } from "./entities/offer.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { UserProfileResponseDto } from "src/users/dto/user-profile-response.dto";
import { CreateOfferDto } from "./dto/create-offer.dto";

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}
  
  async createOffer(user: UserProfileResponseDto, createOfferDto: CreateOfferDto) {
    const { amount, hidden, itemId } = createOfferDto;
    const wish = await this.wishRepository.findOne({
      where: { id: itemId },
      relations: { owner: true },
    });

    if (wish.owner.id === user.id) {
      throw new BadRequestException('Офферт сделать невозможно');
    };

    if (wish.price - wish.raised < createOfferDto.amount) {
      throw new BadRequestException('Слишком большая сумма офферта')
    };

    await this.offerRepository.save({
      amount,
      hidden,
      item: wish,
      user,
    });

    await this.wishRepository.increment({id: wish.id}, 'raised', amount);
  }

  async findOffers() {
    return await this.offerRepository.find({ where: { hidden: false } });
  }

  async getOffer(id: number) {
    return await this.offerRepository.findOneBy({ id });
  }
}