import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<any> {
    const { name } = createRoleDto;

    const role = new Role();
    role.role_name = name;

    await this.roleRepository.save(role);

    return role;
  }

  async getRoleByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { role_name: name },
    });

    return role;
  }

  async getRolePermissions(id: number): Promise<any> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissionsRole', 'permissionsRole.permissions'],
    });
    const permissions = role.permissionsRole.map(
      (permissionRole) => permissionRole.permissions,
    );

    return permissions;
  }

  async getAllRoles(): Promise<any> {
    const roles = await this.roleRepository.find({ select: ['role_name'] });

    return roles;
  }
}
