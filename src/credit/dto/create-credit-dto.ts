import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateCreditDto {
  @IsNotEmpty()
  @IsNumber()
  credit_amount: number;

  @IsNotEmpty()
  credit_to_phone: string;

  @Length(4, 100)
  credit_description: string;
}
