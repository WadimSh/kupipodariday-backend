import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";

import { User } from "src/users/entities/user.entity";
import { Offer } from "src/offers/entities/offer.entity";

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column()
  copied: number;

  @Column()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}