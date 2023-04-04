import { Income } from 'src/income/entities/income.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Space } from './Space.entity';

@Entity()
export class SpaceIncome {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Space, (space) => space.spaceIncome)
  space: Space;

  @ManyToOne((type) => Income, (income) => income.spaceIncome)
  income: Income;
}
