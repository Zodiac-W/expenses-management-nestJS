import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditModule } from 'src/credit/credit.module';
import { DebtModule } from 'src/debt/debt.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { IncomeModule } from 'src/income/income.module';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { Space } from './entities/Space.entity';
import { SpaceCredit } from './entities/spaceCredit';
import { SpaceDebt } from './entities/spaceDebt';
import { SpaceExpenses } from './entities/spaceExpenses.entity';
import { SpaceIncome } from './entities/spaceIncome';
import { SpaceUser } from './entities/spaceUser.entity';
import { SpaceUserRole } from './entities/spaceUserRole.entity';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Space,
      SpaceUser,
      SpaceUserRole,
      SpaceIncome,
      SpaceExpenses,
      SpaceDebt,
      SpaceCredit,
    ]),
    UsersModule,
    RoleModule,
    IncomeModule,
    ExpensesModule,
    DebtModule,
    CreditModule,
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
