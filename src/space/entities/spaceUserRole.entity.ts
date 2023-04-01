import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpaceUser } from './spaceUser.entity';

@Entity()
export class SpaceUserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.spaceUserRole)
  role: Role;

  @OneToOne((type) => SpaceUser, (spaceUser) => spaceUser.spaceUserRole)
  @JoinColumn()
  spaceUser: SpaceUser;
}
