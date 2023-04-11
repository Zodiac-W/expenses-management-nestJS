import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { IncomeService } from './income.service';

@ApiTags('Income')
@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  deleteIncome(@Param('id', ParseIntPipe) id: number) {
    return this.incomeService.deleteIncome(id);
  }
}
