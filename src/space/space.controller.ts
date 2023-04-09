import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateCreditDto } from 'src/credit/dto/create-credit-dto';
import { CreateDebtDto } from 'src/debt/dto/create-debt-dto';
import { User } from 'src/decorators/user.decorator';
import { CreateExpensesDto } from 'src/expenses/dto/create-expenses-dto';
import { CreateIncomeDto } from 'src/income/dto/create-income-dto';
import { CreateWalletDto } from 'src/wallet/dto/create-wallet-dto';
import { CreateSpaceDto } from './dto/create-space-dto';
import { AddUser } from './guards/addUser.guard';
import { CreateWallet } from './guards/CreateWallet.guard';
import { GiveCredit } from './guards/giveCredit.guard';
import { MakePayment } from './guards/makePayment.guard';
import { RecivePayment } from './guards/revicePayment.guard';
import { TakeDebt } from './guards/TakeDebt.guard';
import { WatchData } from './guards/watchData.guard';

import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllSpaces() {
    return this.spaceService.getAllSpaces();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createSpace(@Body() createSpaceDto: CreateSpaceDto, @User() user: any) {
    return this.spaceService.creaeteSpace(createSpaceDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteSpace(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteSpace(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/user/role')
  getUserRole(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    return this.spaceService.getUserRole(user.userId, id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/user/owner')
  getSpaceOwner(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getSpaceOwner(id);
  }

  @UseGuards(JwtAuthGuard, AddUser)
  @Post(':id/user')
  addNewUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('newId') newId: number,
    @Body('role') role: string,
  ) {
    return this.spaceService.addNewUser(newId, id, role);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/users')
  getAllUsers(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllUsers(id);
  }

  @UseGuards(JwtAuthGuard, RecivePayment)
  @Post(':id/add/income/:wId')
  addNewIncome(
    @Body() createIncomeDto: CreateIncomeDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('wId', ParseIntPipe) wId: number,
  ) {
    return this.spaceService.addNewIncome(id, wId, createIncomeDto);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/income')
  getAllIncome(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllIncomes(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/total/income')
  getTotalIncome(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getTotalIncome(id);
  }

  @UseGuards(JwtAuthGuard, MakePayment)
  @Post(':id/add/expenses/:wId')
  addNewExpenses(
    @Body() createExpensesDto: CreateExpensesDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('wId', ParseIntPipe) wId: number,
  ) {
    return this.spaceService.addNewExpenses(id, wId, createExpensesDto);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/expenses')
  getAllExpenses(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllExpenses(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/total/expenses')
  getTotalExpenses(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getTotalExpenses(id);
  }

  @UseGuards(JwtAuthGuard, TakeDebt)
  @Post(':id/add/debt')
  addNewDebt(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDebtDto: CreateDebtDto,
  ) {
    return this.spaceService.addNewDebt(id, createDebtDto);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/debts')
  getAllDebts(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllDebts(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/total/debts')
  getTotalDebt(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getTotalDebt(id);
  }

  @UseGuards(JwtAuthGuard, GiveCredit)
  @Post(':id/add/credit')
  addNewCredit(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCreditDto: CreateCreditDto,
  ) {
    return this.spaceService.addNewCredit(id, createCreditDto);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/credits')
  getAllCredit(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllCredit(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/total/credits')
  getTotalCredit(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getTotalCredit(id);
  }

  @UseGuards(JwtAuthGuard, CreateWallet)
  @Post(':id/add/wallet')
  addNewWallet(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.spaceService.addNewWallet(id, createWalletDto);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/all/wallets')
  getAllWallets(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllWallets(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/total/wallets')
  getTotalWallets(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getTotalWallets(id);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/wallet/:wId')
  getWallet(
    @Param('id', ParseIntPipe) id: number,
    @Param('wId', ParseIntPipe) wId: number,
  ) {
    return this.spaceService.getWallet(id, wId);
  }

  @UseGuards(JwtAuthGuard, WatchData)
  @Get(':id/balance/:wId')
  getWalletBalance(
    @Param('id', ParseIntPipe) id: number,
    @Param('wId', ParseIntPipe) wId: number,
  ) {
    return this.spaceService.getWalletBalance(id, wId);
  }
}
