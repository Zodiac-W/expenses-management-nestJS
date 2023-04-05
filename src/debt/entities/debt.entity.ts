import { SpaceDebt } from 'src/space/entities/spaceDebt';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  debt_amount: number;

  @Column()
  debt_from_phone: string;

  @Column()
  debt_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceDebt, (spaceDebt) => spaceDebt.debt)
  spaceDebt: SpaceDebt;
}
