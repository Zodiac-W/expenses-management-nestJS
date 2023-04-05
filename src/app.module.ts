import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import database from './config/database.config';
import jwtConfig from './config/jwt.config';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { SpaceModule } from './space/space.module';
import { PermissionsModule } from './permissions/permissions.module';
import { IncomeModule } from './income/income.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DebtModule } from './debt/debt.module';
import { CreditModule } from './credit/credit.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, jwtConfig],
      envFilePath: ['./.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule,
    AuthModule,
    RoleModule,
    SpaceModule,
    PermissionsModule,
    IncomeModule,
    ExpensesModule,
    DebtModule,
    CreditModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    console.log(dataSource);
  }
}
