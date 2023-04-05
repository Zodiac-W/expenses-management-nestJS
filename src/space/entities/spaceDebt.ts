import { Debt } from 'src/debt/entities/debt.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Space } from './Space.entity';

@Entity()
export class SpaceDebt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Space, (space) => space.spaceDebt)
  space: Space;

  @ManyToOne((type) => Debt, (debt) => debt.spaceDebt)
  debt: Debt;
}
