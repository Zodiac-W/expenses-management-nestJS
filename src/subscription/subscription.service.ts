import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionService {
  constructor(private usersService: UsersService) {}

  @Cron('0 15 * * *')
  async checkSubscription() {
    const users = await this.usersService.getAllUser();

    for (const user of users) {
      if (user.user_role === 'regularuser') {
        await this.usersService.updateUserStatus(user.id);
        console.log(user);
      }
    }
  }
}
