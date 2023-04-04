import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateExpensesDto {
  @IsNotEmpty()
  @Length(4, 20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Length(4, 100)
  description: string;
}
