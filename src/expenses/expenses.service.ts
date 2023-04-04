import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpensesDto } from './dto/create-expenses-dto';
import { Expenses } from './entities/expenses.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
  ) {}

  async createExpenses(createExpensesDto: CreateExpensesDto): Promise<any> {
    const { name, amount, description } = createExpensesDto;

    const expenses = new Expenses();
    expenses.expenses_name = name;
    expenses.expenses_amount = amount;
    expenses.expenses_description = description;

    await this.expensesRepository.save(expenses);

    return expenses;
  }

  async getExpenses(id: number): Promise<any> {
    const expenses = await this.expensesRepository.findOne({ where: { id } });

    return expenses;
  }

  async deleteExpenses(id: number): Promise<any> {
    const expenses = await this.getExpenses(id);

    await this.expensesRepository.softDelete(id);
    return expenses;
  }
}
