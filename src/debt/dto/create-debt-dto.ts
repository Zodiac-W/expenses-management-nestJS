import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateDebtDto {
  @IsNotEmpty()
  @IsNumber()
  debt_amount: number;

  @IsNotEmpty()
  debt_from_phone: string;

  @Length(4, 100)
  debt_description: string;
}
