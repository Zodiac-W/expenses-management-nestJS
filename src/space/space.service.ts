import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditService } from 'src/credit/credit.service';
import { CreateCreditDto } from 'src/credit/dto/create-credit-dto';
import { DebtService } from 'src/debt/debt.service';
import { CreateDebtDto } from 'src/debt/dto/create-debt-dto';
import { CreateExpensesDto } from 'src/expenses/dto/create-expenses-dto';
import { ExpensesService } from 'src/expenses/expenses.service';
import { CreateIncomeDto } from 'src/income/dto/create-income-dto';
import { IncomeService } from 'src/income/income.service';
import { RoleService } from 'src/role/role.service';
import { UsersService } from 'src/users/users.service';
import { CreateWalletDto } from 'src/wallet/dto/create-wallet-dto';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space-dto';
import { Space } from './entities/Space.entity';
import { SpaceCredit } from './entities/spaceCredit';
import { SpaceDebt } from './entities/spaceDebt';
import { SpaceExpenses } from './entities/spaceExpenses.entity';
import { SpaceIncome } from './entities/spaceIncome';
import { SpaceUser } from './entities/spaceUser.entity';
import { SpaceUserRole } from './entities/spaceUserRole.entity';
import { SpaceWallet } from './entities/spaceWallet.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
    @InjectRepository(SpaceUser)
    private spaceUsesrRepository: Repository<SpaceUser>,
    @InjectRepository(SpaceUserRole)
    private spaceUserRoleRepository: Repository<SpaceUserRole>,
    @InjectRepository(SpaceIncome)
    private spaceIncomeRepository: Repository<SpaceIncome>,
    @InjectRepository(SpaceExpenses)
    private spaceExpensesRepository: Repository<SpaceExpenses>,
    @InjectRepository(SpaceDebt)
    private spaceDebtRepository: Repository<SpaceDebt>,
    @InjectRepository(SpaceCredit)
    private spaceCreditRepository: Repository<SpaceCredit>,
    @InjectRepository(SpaceWallet)
    private spaceWalletRepository: Repository<SpaceWallet>,
    private userService: UsersService,
    private roleService: RoleService,
    private incomeService: IncomeService,
    private expensesService: ExpensesService,
    private debtService: DebtService,
    private creditService: CreditService,
    private walletService: WalletService,
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

  async addNewIncome(
    spaceId: number,
    creaeteIncomeDto: CreateIncomeDto,
  ): Promise<any> {
    const income = await this.incomeService.createIncome(creaeteIncomeDto);
    const space = await this.getOneSpace(spaceId);

    const spaceIncome = new SpaceIncome();
    spaceIncome.income = income;
    spaceIncome.space = space;

    await this.spaceIncomeRepository.save(spaceIncome);

    return spaceIncome;
  }

  async getAllIncomes(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceIncome', 'spaceIncome.income'],
    });
    const incomes = space.spaceIncome.map((spaceIncome) => spaceIncome.income);
    return incomes;
  }

  async getTotalIncome(id: number): Promise<any> {
    const incomes = await this.getAllIncomes(id);

    const amount = incomes.map((income) => income.income_amount);

    const total = amount.reduce((acc, current) => acc + current);

    return total;
  }

  async addNewExpenses(
    spaceId: number,
    createExpensesDto: CreateExpensesDto,
  ): Promise<any> {
    const expenses = await this.expensesService.createExpenses(
      createExpensesDto,
    );
    const space = await this.getOneSpace(spaceId);

    const spaceExpenses = new SpaceExpenses();
    spaceExpenses.expenses = expenses;
    spaceExpenses.space = space;

    await this.spaceExpensesRepository.save(spaceExpenses);
    return spaceExpenses;
  }

  async getAllExpenses(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceExpenses', 'spaceExpenses.expenses'],
    });
    const expenses = space.spaceExpenses.map(
      (spaceExpenses) => spaceExpenses.expenses,
    );

    return expenses;
  }

  async getTotalExpenses(id: number): Promise<any> {
    const expenses = await this.getAllExpenses(id);

    const amount = expenses.map((expenses) => expenses.expenses_amount);

    const total = amount.reduce((acc, current) => acc + current);

    return total;
  }

  async addNewDebt(
    spaceId: number,
    createDebtDto: CreateDebtDto,
  ): Promise<any> {
    const debt = await this.debtService.createDebt(createDebtDto);
    const space = await this.getOneSpace(spaceId);

    const spaceDebt = new SpaceDebt();
    spaceDebt.space = space;
    spaceDebt.debt = debt;

    await this.spaceDebtRepository.save(spaceDebt);
    return spaceDebt;
  }

  async getAllDebts(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceDebt', 'spaceDebt.debt'],
    });

    const debts = space.spaceDebt.map((spaceDebt) => spaceDebt.debt);
    return debts;
  }

  async getTotalDebt(id: number): Promise<any> {
    const debts = await this.getAllDebts(id);

    const amount = debts.map((debt) => debt.debt_amount);

    const total = amount.reduce((acc, current) => acc + current);

    return total;
  }

  async addNewCredit(
    spaceId: number,
    createCreditDto: CreateCreditDto,
  ): Promise<any> {
    const credit = await this.creditService.createCredit(createCreditDto);
    const space = await this.getOneSpace(spaceId);

    const spaceCredit = new SpaceCredit();
    spaceCredit.space = space;
    spaceCredit.credit = credit;

    await this.spaceCreditRepository.save(spaceCredit);

    return spaceCredit;
  }

  async getAllCredit(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceCredit', 'spaceCredit.credit'],
    });

    const credits = space.spaceCredit.map((spaceCredit) => spaceCredit.credit);
    return credits;
  }

  async getTotalCredit(id: number): Promise<any> {
    const credits = await this.getAllCredit(id);

    const amount = credits.map((credit) => credit.credit_amount);

    const total = amount.reduce((acc, current) => acc + current);

    return total;
  }

  async addNewWallet(
    spaceId: number,
    createWalletDto: CreateWalletDto,
  ): Promise<any> {
    const wallet = await this.walletService.createWallet(createWalletDto);
    const space = await this.getOneSpace(spaceId);

    const spaceWallet = new SpaceWallet();
    spaceWallet.space = space;
    spaceWallet.wallet = wallet;

    await this.spaceWalletRepository.save(spaceWallet);

    return spaceWallet;
  }

  async getAllWallets(id: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['spaceWallet', 'spaceWallet.wallet'],
    });

    const wallets = space.spaceWallet.map((spaceWallet) => spaceWallet.wallet);

    return wallets;
  }

  async getTotalWallets(id: number): Promise<any> {
    const wallets = await this.getAllWallets(id);

    const balance = wallets.map((wallet) => wallet.wallet_balance);

    const total = balance.reduce((acc, current) => acc + current);

    return total;
  }

  async getWallet(spaceId: number, walletId: number): Promise<any> {
    const space = await this.spaceRepository.findOne({
      where: { id: spaceId },
      relations: ['spaceWallet', 'spaceWallet.wallet'],
    });

    const wallets = space.spaceWallet.map((spaceWallet) => spaceWallet.wallet);

    const wallet = wallets.find((wallet) => wallet.id === walletId);

    return wallet;
  }

  async getWalletBalance(spaceId: number, walletId: number): Promise<any> {
    const wallet = await this.getWallet(spaceId, walletId);

    const balance = wallet.wallet_balance;

    return { balance };
  }
}
