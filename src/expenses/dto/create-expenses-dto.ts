import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateExpensesDto {
  @ApiProperty({
    example: 'rent',
    description: 'The expenses title',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 20)
  name: string;

  @ApiProperty({
    example: 1200,
    description: 'The total amount of the expense',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'This is my monthly rent',
    description: 'The description for the expenses source/reason',
    type: String,
  })
  @Length(4, 100)
  description: string;
}
