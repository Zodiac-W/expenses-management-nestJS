import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income-dto';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async createIncome(creaeteIncomeDto: CreateIncomeDto): Promise<any> {
    const { name, amount, description } = creaeteIncomeDto;

    const income = new Income();
    income.income_name = name;
    income.income_amount = amount;
    income.income_description = description;

    await this.incomeRepository.save(income);

    return income;
  }

  async getIncome(id: number): Promise<any> {
    const income = await this.incomeRepository.findOne({ where: { id } });

    return income;
  }

  async deleteIncome(id: number): Promise<any> {
    const income = this.getIncome(id);

    await this.incomeRepository.softDelete(id);

    return income;
  }
}
