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

  async canWatchData(id: number): Promise<any> {
    const permissions = await this.getRolePermissions(id);

    const canWatch = permissions.some(
      (permission) => permission.permission_name === 'watch_data',
    );

    if (canWatch) {
      return true;
    } else {
      return false;
    }
  }

  async canAddUser(id: number): Promise<any> {
    const permissions = await this.getRolePermissions(id);

    const canAddUser = permissions.some(
      (permission) => permission.permission_name === 'add_user',
    );

    if (canAddUser) {
      return true;
    } else {
      return false;
    }
  }

  async canRecivePayment(id: number): Promise<any> {
    const permissions = await this.getRolePermissions(id);

    const canRecivePayment = permissions.some(
      (permission) => permission.permission_name === 'recive_payment',
    );

    if (canRecivePayment) {
      return true;
    } else {
      return false;
    }
  }
}
