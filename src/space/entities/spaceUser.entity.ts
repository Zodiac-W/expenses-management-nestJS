import { Space } from 'src/space/entities/Space.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SpaceUserRole } from './spaceUserRole.entity';

@Entity()
export class SpaceUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.spaceUser)
  user: User;

  @ManyToOne((type) => Space, (space) => space.spaceUser)
  space: Space;

  @OneToOne((type) => SpaceUserRole, (spaceUserRole) => spaceUserRole.spaceUser)
  spaceUserRole: SpaceUserRole[];
}
