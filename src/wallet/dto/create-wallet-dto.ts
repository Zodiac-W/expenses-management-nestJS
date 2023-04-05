import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @Length(4, 20)
  wallet_name: string;

  @IsNotEmpty()
  @IsNumber()
  wallet_balance: number;

  @Length(4, 100)
  wallet_description: string;
}
