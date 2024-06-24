import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

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
}