import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDebtDto } from './dto/create-debt-dto';
import { Debt } from './entities/debt.entity';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private debtRepository: Repository<Debt>,
  ) {}

  async createDebt(createDebtDto: CreateDebtDto): Promise<any> {
    const { debt_amount, debt_from_phone, debt_description } = createDebtDto;

    const debt = new Debt();
    debt.debt_amount = debt_amount;
    debt.debt_from_phone = debt_from_phone;
    debt.debt_description = debt_description;

    await this.debtRepository.save(debt);

    return debt;
  }

  async getDebt(id: number): Promise<any> {
    const debt = await this.debtRepository.findOne({ where: { id } });

    return debt;
  }

  async deleteDebt(id: number): Promise<any> {
    const debt = await this.getDebt(id);

    await this.debtRepository.softDelete(id);

    return debt;
  }
}
