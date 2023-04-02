import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionsRole } from './permissionsRole.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission_name: string;

  @Column()
  permission_description: string;

  @OneToMany(
    (type) => PermissionsRole,
    (permissionsRole) => permissionsRole.permissions,
  )
  permissionsRole: PermissionsRole[];
}
