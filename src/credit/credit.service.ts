import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditDto } from './dto/create-credit-dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) {}

  async createCredit(createCreditDto: CreateCreditDto): Promise<any> {
    const { credit_amount, credit_to_phone, credit_description } =
      createCreditDto;

    const credit = new Credit();
    credit.credit_amount = credit_amount;
    credit.credit_to_phone = credit_to_phone;
    credit.credit_description = credit_description;

    await this.creditRepository.save(credit);

    return credit;
  }

  async getCredit(id: number): Promise<any> {
    const credit = await this.creditRepository.findOne({ where: { id } });

    return credit;
  }

  async deleteCredit(id: number): Promise<any> {
    const credit = await this.getCredit(id);

    await this.creditRepository.softDelete(id);

    return credit;
  }
}
