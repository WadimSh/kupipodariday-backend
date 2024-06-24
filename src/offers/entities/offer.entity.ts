import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";

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

  @Column()
  amount: number;

  @Column()
  hidden: boolean;

  @Column()
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @Column()
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}