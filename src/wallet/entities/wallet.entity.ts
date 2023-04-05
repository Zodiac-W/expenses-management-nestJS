import { SpaceWallet } from 'src/space/entities/spaceWallet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_name: string;

  @Column()
  wallet_balance: number;

  @Column()
  wallet_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceWallet, (spaceWallet) => spaceWallet.wallet)
  spaceWallet: SpaceWallet;
}
