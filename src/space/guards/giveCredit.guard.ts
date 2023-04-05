import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { SpaceService } from '../space.service';

@Injectable()
export class GiveCredit implements CanActivate {
  constructor(
    private spaceService: SpaceService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const spaceId = request.params.id;

    const role = await this.spaceService.getUserRole(userId, spaceId);

    const canGiveCredit = await this.roleService.canGiveCredit(role.id);
    return canGiveCredit;
  }
}
