import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column()
  user_phone: string;

  @Column()
  user_pass: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceUser, (spaceUser) => spaceUser.user)
  spaceUser: SpaceUser[];
}
