import { Expenses } from 'src/expenses/entities/expenses.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Space } from './Space.entity';

@Entity()
export class SpaceExpenses {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Space, (space) => space.spaceExpenses)
  space: Space;

  @ManyToOne((type) => Expenses, (expenses) => expenses.spaceExpenses)
  expenses: Expenses;
}
