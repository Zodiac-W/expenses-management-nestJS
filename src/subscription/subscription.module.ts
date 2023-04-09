import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [UsersModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
