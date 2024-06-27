import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { IsString, IsUrl, Length } from "class-validator";

import { Wish } from "src/wishes/entities/wish.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Wishlist {
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

  @Column({
    type: 'varchar',
    length: 1500,
    default: '',
  })
  @IsString()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];

  //есть в swaggerв, но нет в схеме описании данное свойство 
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}