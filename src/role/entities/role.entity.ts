import { SpaceUserRole } from 'src/space/entities/spaceUserRole.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @OneToMany((type) => SpaceUserRole, (spaceUserRole) => spaceUserRole.role)
  spaceUserRole: SpaceUserRole;
}
