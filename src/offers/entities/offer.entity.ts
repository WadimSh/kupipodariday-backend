import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { IsBoolean, IsPositive } from "class-validator";

import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  @IsPositive()
  amount: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}