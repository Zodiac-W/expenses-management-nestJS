import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  space_name: string;

  @OneToMany((type) => SpaceUser, (spaceUser) => spaceUser.space)
  spaceUser: SpaceUser;
}
