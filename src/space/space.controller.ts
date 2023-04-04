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
import { User } from 'src/decorators/user.decorator';
import { CreateIncomeDto } from 'src/income/dto/create-income-dto';
import { CreateSpaceDto } from './dto/create-space-dto';
import { AddUser } from './guards/addUser.guard';
import { RecivePayment } from './guards/revicePayment.guard';
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
  @Post(':id/add/income')
  addNewIncome(
    @Body() createIncomeDto: CreateIncomeDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.spaceService.addNewIncome(id, createIncomeDto);
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
}
