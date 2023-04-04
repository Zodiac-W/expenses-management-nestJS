import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space-dto';
import { Space } from './entities/Space.entity';
import { SpaceUser } from './entities/spaceUser.entity';
import { SpaceUserRole } from './entities/spaceUserRole.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
    @InjectRepository(SpaceUser)
    private spaceUsesrRepository: Repository<SpaceUser>,
    @InjectRepository(SpaceUserRole)
    private spaceUserRoleRepository: Repository<SpaceUserRole>,
    private userService: UsersService,
    private roleService: RoleService,
  ) {}

  async creaeteSpace(
    createSpaceDto: CreateSpaceDto,
    userId: number,
  ): Promise<any> {
    const { name } = createSpaceDto;

    const space = new Space();
    space.space_name = name;

    await this.spaceRepository.save(space);

    const user = await this.userService.getOneUser(userId);

    const spaceUser = new SpaceUser();
    spaceUser.space = space;
    spaceUser.user = user;

    await this.spaceUsesrRepository.save(spaceUser);

    const role = await this.roleService.getRoleByName('OWNER');

    const spaceUserRole = new SpaceUserRole();

    spaceUserRole.spaceUser = spaceUser;
    spaceUserRole.role = role;

    await this.spaceUserRoleRepository.save(spaceUserRole);

    return spaceUserRole;
  }

  async getOneSpace(id: number): Promise<Space> {
    const space = await this.spaceRepository.findOne({ where: { id } });
    return space;
  }

  async getAllSpaces(): Promise<any> {
    const spaces = await this.spaceRepository.find({ select: ['space_name'] });

    return spaces;
  }

  async deleteSpace(id: number): Promise<any> {
    const space = this.getOneSpace(id);

    await this.spaceRepository.softDelete(id);

    return space;
  }

  async getUserRole(userId: number, spaceId: number): Promise<any> {
    const spaceUserRole = await this.spaceUserRoleRepository.findOne({
      where: { spaceUser: { user: { id: userId }, space: { id: spaceId } } },
      relations: ['role'],
    });

    if (!spaceUserRole) {
      throw new NotFoundException(
        `User with id ${userId} does not have a role for space with id ${spaceId}`,
      );
    }

    return spaceUserRole.role;
  }

  async addNewUser(userId: number, spaceId: number, roleName: string) {
    const user = await this.userService.getOneUser(userId);

    const space = await this.getOneSpace(spaceId);

    const spaceUser = new SpaceUser();
    spaceUser.user = user;
    spaceUser.space = space;

    await this.spaceUsesrRepository.save(spaceUser);

    const role = await this.roleService.getRoleByName(roleName);

    const spaceUserRole = new SpaceUserRole();

    spaceUserRole.spaceUser = spaceUser;
    spaceUserRole.role = role;

    await this.spaceUserRoleRepository.save(spaceUserRole);

    return spaceUserRole;
  }

  async getAllUsers(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceUser', 'spaceUser.user'],
    });
    const users = space.spaceUser.map((spaceUser) => spaceUser.user);

    return users;
  }
}
