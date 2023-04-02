import { Role } from 'src/role/entities/role.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './Permission.entity';

@Entity()
export class PermissionsRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.permissionsRole)
  role: Role;

  @ManyToOne(
    (type) => Permissions,
    (permissions) => permissions.permissionsRole,
  )
  permissions: Permissions;
}
