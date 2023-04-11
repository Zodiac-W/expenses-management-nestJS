import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({
    example: 'Home-wallet',
    description: 'The wallet title',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 20)
  wallet_name: string;

  @ApiProperty({
    example: 800,
    description:
      'The wallet total balance initial value could be zero or any value',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  wallet_balance: number;

  @ApiPropertyOptional({
    example: 'This wallet is for home expenses',
    description: 'The description of this wallet usage',
    type: String,
  })
  @Length(4, 100)
  wallet_description: string;
}
