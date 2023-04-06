import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { SpaceService } from '../space.service';

@Injectable()
export class RecivePayment implements CanActivate {
  constructor(
    private spaceService: SpaceService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const spaceId = request.params.id;
    const walletId = parseInt(request.params.wId, 10);
    const wallet = await this.spaceService.getWallet(spaceId, walletId);

    if (!wallet) {
      return false;
    }

    const role = await this.spaceService.getUserRole(userId, spaceId);
    const canRecivePayment = await this.roleService.canRecivePayment(role.id);

    return canRecivePayment;
  }
}
