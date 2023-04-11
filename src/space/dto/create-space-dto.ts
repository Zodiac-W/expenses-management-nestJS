import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({
    example: 'Home-space',
    description: 'The space title',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 30)
  name: string;
}
