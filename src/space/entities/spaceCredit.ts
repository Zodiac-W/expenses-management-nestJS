import { Credit } from 'src/credit/entities/credit.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Space } from './Space.entity';

@Entity()
export class SpaceCredit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Space, (space) => space.spaceCredit)
  space: Space;

  @ManyToOne((type) => Credit, (credit) => credit.spaceCredit)
  credit: Credit;
}
