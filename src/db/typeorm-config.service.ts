import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import { Space } from 'src/space/entities/Space.entity';
import { User } from 'src/users/entities/user.entity';
import { SpaceUserRole } from 'src/space/entities/spaceUserRole.entity';
import { Permissions } from 'src/permissions/entities/Permission.entity';
import { PermissionsRole } from 'src/permissions/entities/permissionsRole.entity';
import { Income } from 'src/income/entities/income.entity';
import { SpaceIncome } from 'src/space/entities/spaceIncome';
import { Expenses } from 'src/expenses/entities/expenses.entity';
import { SpaceExpenses } from 'src/space/entities/spaceExpenses.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions() {
    return {
      type: this.configService.get('database.type'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.database'),
      synchronize: this.configService.get('database.synchronize'),
      entities: [
        User,
        Role,
        Space,
        SpaceUser,
        SpaceUserRole,
        Permissions,
        PermissionsRole,
        Income,
        SpaceIncome,
        Expenses,
        SpaceExpenses,
      ],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: './migrations',
        subscribersDir: 'subscriber',
      },
    };
  }
}
