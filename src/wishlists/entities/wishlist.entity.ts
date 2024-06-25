import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { IsString, IsUrl, Length } from "class-validator";

import { Wish } from "src/wishes/entities/wish.entity";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

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
  @Length(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];
}