import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateIncomeDto {
  @ApiProperty({
    example: 'Salary',
    description: 'The income title',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 20)
  name: string;

  @ApiProperty({
    example: 2000,
    description: 'The amount of income',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({
    example: 'This is my monthly salary',
    description: 'The description of this income source/reason',
    type: String,
  })
  @Length(4, 100)
  description: string;
}
