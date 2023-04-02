import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { In, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission-dto';
import { Permissions } from './entities/Permission.entity';
import { PermissionsRole } from './entities/permissionsRole.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
    @InjectRepository(PermissionsRole)
    private permissionsRoleRepository: Repository<PermissionsRole>,
    private roleService: RoleService,
  ) {}

  async newPermission(createPermissionDto: CreatePermissionDto): Promise<any> {
    const { name, description } = createPermissionDto;

    const permission = new Permissions();
    permission.permission_name = name;
    permission.permission_description = description;

    await this.permissionRepository.save(permission);

    return permission;
  }

  async getOnePermission(id: number): Promise<Permissions> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    return permission;
  }

  async getPermissionsName(ids: number[]): Promise<string[]> {
    const permissions = await this.permissionRepository.find({
      where: { id: In(ids) },
    });
    return permissions.map((permission) => permission.permission_name);
  }

  async addPermissionToRole(id: number, name: string): Promise<any> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    const role = await this.roleService.getRoleByName(name);

    const permissionRole = new PermissionsRole();
    permissionRole.permissions = permission;
    permissionRole.role = role;

    await this.permissionsRoleRepository.save(permissionRole);

    return permissionRole;
  }
}
