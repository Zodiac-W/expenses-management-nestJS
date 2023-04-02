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
}
