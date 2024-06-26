import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { IsNumber, IsPositive, IsString, IsUrl, Length, IsInt } from "class-validator";

import { User } from "src/users/entities/user.entity";
import { Offer } from "src/offers/entities/offer.entity";

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @IsString()
  @Length(1, 1024)
  description: string;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({
    type: 'decimal',
    scale: 2,
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  raised: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  @IsInt()
  @IsPositive()
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}