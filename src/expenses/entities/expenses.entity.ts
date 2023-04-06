import { SpaceExpenses } from 'src/space/entities/spaceExpenses.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expenses_name: string;

  @Column()
  expenses_amount: number;

  @Column()
  expenses_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceExpenses, (spaceExpenses) => spaceExpenses.expenses)
  spaceExpenses: SpaceExpenses[];
}
