import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpaceExpenses } from './spaceExpenses.entity';
import { SpaceIncome } from './spaceIncome';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  space_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceUser, (spaceUser) => spaceUser.space)
  spaceUser: SpaceUser[];

  @OneToMany((type) => SpaceIncome, (spaceIncome) => spaceIncome.space)
  spaceIncome: SpaceIncome[];

  @OneToMany((type) => SpaceExpenses, (spaceExpenses) => spaceExpenses.space)
  spaceExpenses: SpaceExpenses[];
}
