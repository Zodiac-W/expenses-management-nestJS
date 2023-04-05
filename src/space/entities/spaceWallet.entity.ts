import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Space } from './Space.entity';

@Entity()
export class SpaceWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((type) => Space, (space) => space.spaceWallet)
  space: Space;

  @ManyToOne((type) => Wallet, (wallet) => wallet.spaceWallet)
  wallet: Wallet;
}
