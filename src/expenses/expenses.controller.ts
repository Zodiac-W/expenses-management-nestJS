import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  deleteExpenses(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.deleteExpenses(id);
  }
}
