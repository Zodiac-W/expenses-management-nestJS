import { Role } from 'src/role/entities/role.entity';
import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import { Space } from 'src/space/entities/Space.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SpaceUserRole } from 'src/space/entities/spaceUserRole.entity';
import { Permissions } from 'src/permissions/entities/Permission.entity';
import { PermissionsRole } from 'src/permissions/entities/permissionsRole.entity';
import { Income } from 'src/income/entities/income.entity';
import { SpaceIncome } from 'src/space/entities/spaceIncome';
import { Expenses } from 'src/expenses/entities/expenses.entity';
import { SpaceExpenses } from 'src/space/entities/spaceExpenses.entity';
import { Debt } from 'src/debt/entities/debt.entity';
import { SpaceDebt } from 'src/space/entities/spaceDebt';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
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
    Debt,
    SpaceDebt,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: './migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
