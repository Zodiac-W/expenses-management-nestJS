import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { SpaceService } from '../space.service';

@Injectable()
export class AddUser implements CanActivate {
  constructor(
    private spaceService: SpaceService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const spaceId = request.params.id;

    const role = await this.spaceService.getUserRole(userId, spaceId);

    const canAdduser = await this.roleService.canAddUser(role.id);

    return canAdduser;
  }
}
