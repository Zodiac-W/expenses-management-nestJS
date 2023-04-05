import { SpaceCredit } from 'src/space/entities/spaceCredit';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  credit_amount: number;

  @Column()
  credit_to_phone: string;

  @Column()
  credit_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceCredit, (spaceCredit) => spaceCredit.credit)
  spaceCredit: SpaceCredit;
}
