import { SpaceIncome } from 'src/space/entities/spaceIncome';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  income_name: string;

  @Column()
  income_amount: number;

  @Column()
  income_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceIncome, (spaceIncome) => spaceIncome.income)
  spaceIncome: SpaceIncome[];
}
